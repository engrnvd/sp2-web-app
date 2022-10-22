import type { Validator } from '../validator'

export function websiteRule(field) {
  return [field, '', (v: Validator) => {
    const value = v.form[field]
    if (!value) return true
    if (!value.toString().match(/https?\:\/\/.+\..+/)) {
      v.setError(field, `${value} is not a valid website`)
    }
    return true
  }]
}
