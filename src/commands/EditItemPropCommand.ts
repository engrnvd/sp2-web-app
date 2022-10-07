import { SitemapBlock } from '../classes/SitemapBlock'
import { SitemapPage } from '../classes/SitemapPage'
import { SitemapSection } from '../classes/SitemapSection'
import { Command } from './Command'

export class EditItemPropCommand extends Command {
  description = 'Edit item property'
  oldValue = ''

  label(): string {
    return `Edit ${this.item._type} ${this.payload.prop}`
  }

  get item(): SitemapPage | SitemapBlock | SitemapSection {
    return this.payload.item
  }

  run() {
    this.oldValue = this.item[this.payload.prop]
    this.item[this.payload.prop] = this.payload.value

    super.run()
  }

  undo() {
    this.item[this.payload.prop] = this.oldValue

    super.undo()
  }
}
