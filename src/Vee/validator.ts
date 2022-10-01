export class Validator {
  errors = {}
  rules = {}
  form

  constructor(form) {
    this.form = form
  }

  get hasErrors() {
    return Object.values(this.errors).flat().length > 0
  }

  setError(field, message) {
    this.errors[field] = this.errors[field] || []
    this.errors[field].push(message)
  }

  reset() {
    this.errors = {}
  }

  addRule(rule) {
    const [fieldName, message, fn] = rule
    this.addCustomRule(fieldName, message, fn)
  }

  addCustomRule(field, message, validationFn) {
    this.rules[field] = this.rules[field] || []
    this.rules[field].push({ message, validationFn })
  }

  validateField(fieldName) {
    this.errors[fieldName] = []
    let rules = this.rules[fieldName]
    for (const rule of rules) {
      if (!rule.validationFn(this)) {
        this.setError(fieldName, rule.message)
      }
    }
  }

  validate() {
    for (const field in this.rules) {
      this.validateField(field)
    }
  }
}
