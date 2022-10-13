import { _deepClone } from 'src/helpers/misc'
import { reactive, ref } from 'vue'

export function useClone(obj: any) {
  const data = reactive({})
  init()

  function apply() {
    for (const key in data) {
      obj[key] = data[key]
    }
  }

  function init() {
    for (const key in obj) {
      data[key] = _deepClone(obj[key])
    }
  }

  return { data, apply, cancel: init }
}
