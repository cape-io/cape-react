import curry from 'lodash/curry'
import includes from 'lodash/includes'

import { loadImageUrl } from './process'

export function getInputId(id) {
  return `fileselect-${id}`
}
export function giveFocus(props) {
  const { form: { focus }, formEvent: { onFocus } } = props
  if (!focus) onFocus()
}
export function blurFileSelect(props) {
  const { form: { focus }, formEvent: { onBlur } } = props
  if (focus) onBlur()
}
// export function activateFileSelect(props) {
//   return () => {
//     console.log('activateFileSelect')
//     // giveFocus(props)
//     // document.getElementById(getInputId(props.subjectId)).focus()
//   }
// }
// export function deactivateFileSelect(props) {
//   return () => { blurFileSelect(props) }
// }
// This is just to (un)set the focus.
function _handleFileHover(props, event) {
  console.log('handleFileHover')
  const { form: { focus }, formEvent: { onBlur } } = props
  if (event.preventDefault) event.preventDefault()
  if (event.stopPropagation) event.stopPropagation()
  if (event.type === 'dragover') {
    event.dataTransfer.dropEffect = 'copy' // eslint-disable-line no-param-reassign
    giveFocus(props)
  } else if (focus) {
    onBlur(props)
  }
}
export const handleFileHover = curry(_handleFileHover)

function _handleFileSelect(props, event) {
  console.log('handleFileSelect')
  const { accept, fieldEvent, form, maxFiles } = props
  handleFileHover(props, event)
  // # Fetch file list object.
  const files = event.target.files || event.dataTransfer.files
  const file = files[0]
  if (!file.type.startsWith('image')) {
    return fieldEvent.error('Only image uploads are allowed.')
  }
  if (!includes(accept, file.type)) {
    return fieldEvent.error(
      `Not a valid image file type. Found ${file.type} but expected ${accept}.`
    )
  }
  if (files.length > maxFiles) {
    fieldEvent.error({
      message: `Please only upload ${maxFiles} image at a time.`,
      status: 'warning',
    })
  }
  if (form.error) fieldEvent.clearError()
  loadImageUrl(props, file)
  return undefined
}
export const handleFileSelect = curry(_handleFileSelect)
