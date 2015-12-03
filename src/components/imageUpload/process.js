const _ = require('lodash')

import 'isomorphic-fetch'

export function humanFileSize(bytes) {
  const units = [ 'B', 'KB', 'MB', 'GB' ]
  const index = Math.floor( Math.log(bytes) / Math.log(1024) )
  const size = ( bytes / Math.pow(1024, index) ).toFixed(2) * 1
  return {
    value: size,
    unit: units[index],
  }
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
      if (3000000 > fileInfo.bytes) {
        fileInfo.fileData = event.target.result
      }
      return cb(null, fileInfo)
    }
    img.src = reader.result
  }
  return reader.readAsDataURL(fileInfo.file)
}

export function uploadFile(fileInfo, uploadInfo, metadata, onProgress, onSuccess) {
  const { cdn, imgix, maxFileSize, maxFileCount,
    expires, signature, prefix, url } = uploadInfo

  const cdnDomain = cdn || 'cape-io.imgix.net'
  const imgixQuery = imgix || '?w=300&h=300&fit=crop&crop=faces'
  const xhr = new XMLHttpRequest()
  function handleProgress(event) {
    const progress = parseInt(event.loaded / event.total * 100)
    if (progress % 5 === 0) {
      return onProgress(progress)
    }
  }
  xhr.upload.addEventListener('progress', handleProgress, false)
  xhr.onreadystatechange = (event) => {
    if (xhr.readyState !== 4) {
      // 0: request not initialized
      // 1: server connection established
      // 2: request received
      // 3: processing request
      // console.log('xhr.onreadystatechange', xhr.readyState, event)
      return undefined
    }
    // Request finished and response is ready.
    if (xhr.status !== 201) {
      return console.error('Error uploading file.', xhr.status, event)
    }
    const { bytes, file, type, humanSize, width, height } = fileInfo
    const fieldValue = {
      bytes,
      fileId: prefix + file.name,
      size: humanSize.value + ' ' + humanSize.unit,
      metadata: metadata,
      dimensions: {
        type: type,
        width: width,
        height: height,
      },
    }
    console.log('Uploaded img to cloud.', fieldValue)

    // fetch.post('/api/file').send({
    // }).accept('json').end(function (err, res) {
    //   if (err) {
    //     console.error(err)
    //   }
    //   if (res.body) {
    //     _.merge(fieldValue, res.body)
    //     if (onSuccess) {
    //       onSuccess(fieldValue)
    //     }
    //     return console.log(fieldValue)
    //   }
    // })
    onProgress(101)
    const imgSrc = '//' + cdnDomain + prefix + encodeURIComponent(file.name) + imgixQuery
    const itemImg = new Image()
    itemImg.onload = function () {
      console.log('Resized img.')
      fieldValue.previewUrl = itemImg.src
      if (onSuccess) {
        return onSuccess(fieldValue)
      }
    }
    itemImg.onerror = function (err) {
      console.error(err)
      return alert('There was an error processing your image. The image needs to be a JPG or GIF. You could refresh the page and see if it shows up in your list. If it shows a broken image delete the file and upload with correct file type.')
    }
    return itemImg.src = imgSrc
  }

  const formData = new FormData()
  formData.append('max_file_size', maxFileSize)
  formData.append('max_file_count', maxFileCount)
  formData.append('expires', expires)
  formData.append('signature', signature)
  formData.append('file1', file)
  xhr.open('POST', url, true)
  return xhr.send(formData)
}
