export function toFormData(dataObject) {
  let formData = new FormData
  for (const key in dataObject) {
    formData.append(key, dataObject[key])
  }
  return formData
}

export function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showSimpleToast('Copied...')
    })
  }
}

export function showSimpleToast(text, duration = 3000) {
  let div = document.createElement('div')
  // @ts-ignore
  div['style'] = `
      padding: 0.5em;
      background-color: var(--dark);
      color: var(--white);
      position: fixed;
      right: 1em;
      top: 1em;
      z-index: 999;
      border-radius: 0.5em;
      box-shadow: var(--shadow)
  `
  div.textContent = text
  document.body.append(div)
  setTimeout(() => {
    div.remove()
  }, duration)
}

export function _sleep(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds)
  })
}

export function _deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export class DebounceFn {
  timer = null
  delay = 0

  constructor(delay) {
    this.delay = delay
  }

  run(fn) {
    clearTimeout(this.timer)
    this.timer = setTimeout(fn, this.delay)
  }
}

export function randomInt(from, to) {
  return Math.floor((Math.random() + from) * to)
}

export function cssVar(variable, value = null): string {
  let r = document.querySelector(':root')
  if (value) {
    // @ts-ignore
    return r.style.setProperty(variable, value)
  }
  let rs = getComputedStyle(r)
  return rs.getPropertyValue(variable)
}

export function cssFontSize() {
  return parseInt(cssVar('--font-size'))
}

export function randomArrayItem(arr: any[]) {
  return arr[randomInt(0, arr.length)]
}
