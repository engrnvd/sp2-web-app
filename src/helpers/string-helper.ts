export function _ucFirst([first, ...rest]) {
  return first.toLocaleUpperCase() + rest.join('')
}

export function _stripSpecialChars(str, replacement = '') {
  return str.toLowerCase().replace(/[^a-zA-Z\d]/g, replacement)
}

export function _snakeCase(str) {
  return _stripSpecialChars(str, '_')
}

export function _titleCase(str) {
  return _stripSpecialChars(str, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())
}
