import sha1Hash from 'simple-sha1'
import last from 'lodash/last'
import 'isomorphic-fetch'

export function uploadFile(props, fileBuffer, meta) {
  const { entityPut, fieldEvent, predicate, subject, triplePut } = props
  const { error, savedProgress } = fieldEvent
  const { contentSha1, id, lastModified, name } = meta
  // const file = document.getElementById(inputId).files[0]
  const ext = last(name.split('.')).toLowerCase()
  // const { authorizationToken, uploadUrl } = valid[sha1]
  const uploadUrl = '/api/upload/b2'
  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', savedProgress, false)
  xhr.onreadystatechange = () => {
    // 0: request not initialized
    if (xhr.readyState === 0) {
      return error('Unable to initialize connection to CAPE Cloud Storage.')
    }
    // Just ignore these middle steps. We use handleProgress above.
    if (xhr.readyState !== 4) {
      // 1: server connection established
      // 2: request received
      // 3: processing request
      return undefined
    }
    // Request finished and response is ready.
    if (xhr.status > 201) {
      // console.error(event)
      return error(`Error uploading file. Status: ${xhr.status}`)
    }
    const object = JSON.parse(xhr.responseText)
    entityPut(object)
    triplePut({ subject, object, predicate })
    fieldEvent.meta({ [meta.id]: true })
    return true
  }
  xhr.open('POST', uploadUrl)
  // xhr.setRequestHeader('Authorization', authorizationToken)
  xhr.setRequestHeader('X-Bz-File-Name', `${contentSha1}.${ext}`)
  // xhr.setRequestHeader('Content-Type', fileFormat)
  // xhr.setRequestHeader('Content-Length', contentSize)
  xhr.setRequestHeader('X-Bz-Content-Sha1', contentSha1)
  xhr.setRequestHeader('X-Bz-Info-src_last_modified_millis', lastModified)
  xhr.setRequestHeader('X-Bz-Info-id', id)
  xhr.send(fileBuffer)
}

export function loadSha(props, file, meta) {
  const { fieldEvent, predicate, subject } = props
  const reader = new FileReader()
  reader.onloadend = () => sha1Hash(reader.result, contentSha1 => {
    const newMeta = { ...meta, contentSha1 }
    fetch(`/api/upload/get-insert/${predicate}/${subject.id}`, {
      body: JSON.stringify(newMeta),
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => {
      fieldEvent.meta({ ...meta, ...res })
      uploadFile(props, reader.result, res)
    })
  })
  reader.readAsArrayBuffer(file)
}
export function fileMeta(file) {
  return {
    contentSize: file.size,
    // dateModified: file.
    fileFormat: file.type,
    lastModified: file.lastModified,
    name: file.name,
    type: 'ImageObject',
  }
}
export function loadImageUrl(props, file) {
  const { fieldEvent } = props
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
      const url = file.size < 4100069 ? reader.result : null
      fieldEvent.meta({ [file.name]: { ...meta, url } }, { sendSocket: false })
      loadSha(props, file, meta)
    }
    img.src = reader.result
  }
  reader.readAsDataURL(file)
}
