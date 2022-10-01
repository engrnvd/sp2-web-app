import { ref, watch } from 'vue'
import { Storage } from '../helpers/storage-helper'

export function useStorage(key, data = null) {
  let storedData = read()

  if (storedData) {
    data = ref(storedData)
  } else {
    data = ref(data)
    write()
  }

  watch(data, write, { deep: true })

  function read() {
    let v = Storage.get(key)
    if (!v) return v
    return JSON.parse(v)
  }

  function write() {
    if (data.value === null || data.value === '') {
      Storage.remove(key)
    } else {
      Storage.set(key, JSON.stringify(data.value))
    }
  }

  return data
}
