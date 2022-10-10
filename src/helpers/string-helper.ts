// @ts-ignore
export function _ucFirst([first, ...rest]) {
  return first.toLocaleUpperCase() + rest.join('')
}

export function _stripSpecialChars(str: string, replacement = '') {
  return str.toLowerCase().replace(/[^a-zA-Z\d]/g, replacement)
}

export function _snakeCase(str: string) {
  return _stripSpecialChars(str, '_')
}

export function _titleCase(str: string) {
  return _stripSpecialChars(str, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())
}

export function _textWidth(text: string, font: string) {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  // @ts-ignore
  context.font = font
  // @ts-ignore
  return context.measureText(text).width
}
