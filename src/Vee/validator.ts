export class Validator {
  errors = {}
  rules = {}
  form

  constructor(form: Object) {
    this.form = form
  }

  get hasErrors() {
    // @ts-ignore
    return Object.values(this.errors).flat().length > 0
  }

  setError(field: string, message: string) {
    // @ts-ignore
    this.errors[field] = this.errors[field] || []
    // @ts-ignore
    this.errors[field].push(message)
  }

  reset() {
    this.errors = {}
  }

  addRule(rule: [string, string, Function]) {
    const [fieldName, message, fn] = rule
    this.addCustomRule(fieldName, message, fn)
  }

  addCustomRule(field: string, message: string, validationFn: Function) {
    // @ts-ignore
    this.rules[field] = this.rules[field] || []
    // @ts-ignore
    this.rules[field].push({ message, validationFn })
  }

  validateField(fieldName: string) {
    // @ts-ignore
    this.errors[fieldName] = []
    // @ts-ignore
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
