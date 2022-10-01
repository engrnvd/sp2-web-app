import { _titleCase } from '../../helpers/string-helper'

export function requiredRule(field) {
  return [
    field,
    `${_titleCase(field)} is required`,
    v => !!v.form[field]?.length
  ]
}
