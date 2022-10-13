import { SitemapBlock } from '../classes/SitemapBlock'
import { SitemapPage } from '../classes/SitemapPage'
import { SitemapSection } from '../classes/SitemapSection'
import { Command } from './Command'

interface Payload {
  item: SitemapPage | SitemapBlock | SitemapSection,
}

export class DeleteItemCommand extends Command {
  description = 'Delete item'
  index = -1
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  label(): string {
    return `Delete ${this.item._type}`
  }

  get item() {
    return this.payload.item
  }

  get items(): SitemapPage[] | SitemapBlock[] | SitemapSection[] {
    if (this.item instanceof SitemapPage) return this.item.parent.children
    if (this.item instanceof SitemapBlock) return this.item.page.blocks
    if (this.item instanceof SitemapSection) return this.item.sitemap.sections
    console.error('Cant delete', this.item)
    return []
  }

  run() {
    // @ts-ignore
    this.index = this.items.indexOf(this.item)
    this.items.splice(this.index, 1)

    super.run()
  }

  undo() {
    // @ts-ignore
    this.items.splice(this.index, 0, this.item)

    super.undo()
  }
}
