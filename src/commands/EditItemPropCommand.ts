import type { SitemapBlock } from '../classes/SitemapBlock'
import type { SitemapPage } from '../classes/SitemapPage'
import type { SitemapSection } from '../classes/SitemapSection'
import { Command } from './Command'

interface Payload {
  item: SitemapPage | SitemapBlock | SitemapSection,
  prop: string,
  value: any,
}

export class EditItemPropCommand extends Command {
  description = 'Edit item property'
  oldValue: any = ''
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
    this.oldValue = this.item[this.payload.prop]
  }

  label(): string {
    return `Edit ${this.item._type} ${this.payload.prop}`
  }

  get item() {
    return this.payload.item
  }

  run() {
    this.item[this.payload.prop] = this.payload.value

    super.run()
  }

  undo() {
    this.item[this.payload.prop] = this.oldValue

    super.undo()
  }
}
