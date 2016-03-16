import sha1Hash from 'simple-sha1'
import last from 'lodash/last'

export function loadSha(props, file, meta) {
  const reader = new FileReader()
  reader.onloadend = () => sha1Hash(reader.result, sha1 => {
    props.fieldEvent.meta({ ...meta, sha1 })
  })
  reader.readAsArrayBuffer(file)
}
export function fileMeta(file) {
  return {
    contentSize: file.size,
    fileFormat: file.type,
    name: file.name,
  }
}
export function loadImageUrl(props, file) {
  const { entityUpdate, fieldEvent, id } = props
  const reader = new FileReader()
  reader.onloadend = () => {
    const img = new Image
    img.onerror = () => fieldEvent.error(
      'Invalid image file. The file is corrupt or has an the wrong filename extension.'
    )
    img.onload = () => {
      // console.log(img.width, img.height)
      const meta = fileMeta(file)
      meta.height = { unitCode: 'E37', value: img.height, unitText: 'pixel' }
      meta.width = { unitCode: 'E37', value: img.width, unitText: 'pixel' }
      // Include fileData base64 thing.
      if (file.size < 4100069) {
        entityUpdate({ id, url: reader.result })
      }
      loadSha(props, file, meta)
    }
    img.src = reader.result
  }
  reader.readAsDataURL(file)
}

export function uploadFile(props, inputId) {
  const { fieldEvent: { error, savedProgress }, form: { meta, valid }, id } = props
  const { contentSize, fileFormat, name, sha1 } = meta
  const file = document.getElementById(inputId).files[0]
  const ext = last(name.split('.'))
  const { authorizationToken, uploadUrl } = valid[sha1]
  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', savedProgress, false)
  xhr.onreadystatechange = event => {
    // 0: request not initialized
    if (xhr.readyState === 0) {
      return error('Unable to initialize connection to Backblaze B2 Cloud Storage.')
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
      console.error(event)
      return error(`Error uploading file. Status: ${xhr.status}`)
    }
    return true
  }
  console.log('upload')
  const reader = new FileReader()
  reader.onloadend = () => {
    xhr.open('POST', uploadUrl)
    xhr.setRequestHeader('Authorization', authorizationToken)
    xhr.setRequestHeader('X-Bz-File-Name', `${sha1}.${ext}`)
    xhr.setRequestHeader('Content-Type', fileFormat)
    xhr.setRequestHeader('Content-Length', contentSize)
    xhr.setRequestHeader('X-Bz-Content-Sha1', sha1)
    xhr.setRequestHeader('X-Bz-Info-src_last_modified_millis', file.lastModified)
    xhr.setRequestHeader('X-Bz-Info-id', id)
    xhr.send(reader.result)
  }
  reader.readAsArrayBuffer(file)
}
