const _ = require('lodash')

import { callApi } from '../../utils/callApi'

export function humanFileSize(bytes) {
  const units = [ 'B', 'KB', 'MB', 'GB' ]
  const index = Math.floor( Math.log(bytes) / Math.log(1024) )
  const size = ( bytes / Math.pow(1024, index) ).toFixed(2) * 1
  return {
    value: size,
    unit: units[index],
  }
}

// Rename remote cloud file and save information to database.
export function updateApi(uploadInfo, metadata, fileInfo, onProgress, onSuccess, onError) {
  const { container, prefix, cdnDomain } = uploadInfo
  const { bytes, file, type, humanSize, width, height } = fileInfo
  const { contentType, entityId, fieldId, display,...rest } = metadata
  // This is what we are going to send/save to the database.
  // Id field is created on the server, along with md5.
  // @TODO Compute most of these values on the server.
  const fieldValue = {
    container,
    // The CDN isn't going to change for this file.
    cdnDomain,
    contentType: type,
    // dimensions is useful clientside.
    dimensions: {
      width: width,
      height: height,
    },
    // The file might be used in many content types or fields.
    // This should probably be a set instead of a single obj.
    entity: {
      contentType,
      entityId,
      fieldId,
      // Display settings are specific to this field.
      display,
    },
    // uploadPath, name, size, type is useful clientside.
    uploadPath: prefix + file.name,
    name: file.name,
    size: { ...humanSize, bytes },
    type: 'image',
    prefix,
    ...rest,
  }
  callApi({
    api: 'api',
    endpoint: 'content/file',
    method: 'post',
    body: fieldValue,
  }).then(
    response => {
      console.log('updateApi', response)
      function _onSuccess() {
        onSuccess(response)
      }
      if (response.preview && response.preview.image) {
        return loadImage(response.preview.image.url, _onSuccess, onError)
      }
      _onSuccess()
    },
    error => {
      console.error(error)
      onError('Failure trying to process file via CAPE API.')
    }
  )
  console.log('Uploaded img to cloud.')
}

export function loadImage(imgSrc, onSuccess, onError) {
  const itemImg = new Image()
  itemImg.onload = function () {
    console.log('Resized img.')
    if (onSuccess) {
      return onSuccess()
    }
  }
  itemImg.onerror = function (err) {
    // How do we know what kind of error it is?
    console.error(err)
    if (onError) {
      onError(err)
    }
    return alert('There was an error processing your image. The image needs to be a JPEG, PNG or GIF.')
    // Should we remove the file from the server?
  }
  return itemImg.src = imgSrc
}

export function processImgFile(fileInfo, validImgTypes, cb) {
  const { file, md5 } = fileInfo
  if (md5) {
    fileInfo.uploaded = true
    fileInfo.progress = 100
    return cb(fileInfo)
  }
  if (!file) {
    return cb('Missing file')
  }
  fileInfo.name = file.name
  fileInfo.bytes = file.size
  fileInfo.type = file.type
  fileInfo.image = fileInfo.type.indexOf('image') === 0
  fileInfo.humanSize = humanFileSize(fileInfo.bytes)
  if (!fileInfo.image) {
    return cb('Not of type image.')
  }
  if (_.isArray(validImgTypes)) {
    if (!_.contains(validImgTypes, fileInfo.type)) {
      return cb('Not a valid image type.')
    }
  }
  const reader = new FileReader()
  reader.onload = (event) => {
    const img = new Image
    img.onerror = function (err) {
      alert('You may only upload valid JPG, PNG and GIF image files. Changing the filename extension does not change the file type.')
      return cb(err)
    }
    img.onload = function () {
      // console.log(img.width, img.height)
      fileInfo.width = img.width
      fileInfo.height = img.height
      // Include fileData base64 thing.
      if (4000000 > fileInfo.bytes) {
        fileInfo.fileData = event.target.result
      }
      return cb(null, fileInfo)
    }
    img.src = reader.result
  }
  return reader.readAsDataURL(fileInfo.file)
}

export function uploadFile(fileInfo, uploadInfo, metadata, onProgress, onSuccess, onFail) {
  const { maxFileSize, maxFileCount,
    expires, signature, url } = uploadInfo

  const xhr = new XMLHttpRequest()
  function handleProgress(event) {
    const progress = parseInt(event.loaded / event.total * 100)
    if (progress % 5 === 0) {
      return onProgress(progress)
    }
  }
  xhr.upload.addEventListener('progress', handleProgress, false)
  xhr.onreadystatechange = (event) => {
    // 0: request not initialized
    if (xhr.readyState === 0) {
      console.error('Unable to initialize connection to cloud files.')
      onFail()
    }
    // Just ignore these middle steps. We use handleProgress above.
    if (xhr.readyState !== 4) {
      // 1: server connection established
      // 2: request received
      // 3: processing request
      return undefined
    }
    // Request finished and response is ready.
    if (xhr.status !== 201) {
      onFail()
      return console.error('Error uploading file.', xhr.status, event)
    }
    onProgress(101)
    updateApi(uploadInfo, metadata, fileInfo, onProgress, onSuccess)
  }

  const formData = new FormData()
  formData.append('max_file_size', maxFileSize)
  formData.append('max_file_count', maxFileCount)
  formData.append('expires', expires)
  formData.append('signature', signature)
  formData.append('file1', fileInfo.file)
  xhr.open('POST', url, true)
  return xhr.send(formData)
}
