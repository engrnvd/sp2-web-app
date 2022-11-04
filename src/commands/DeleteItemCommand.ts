import { SitemapNote } from 'src/classes/SitemapNote'
import { SitemapBlock } from '../classes/SitemapBlock'
import { SitemapPage } from '../classes/SitemapPage'
import { SitemapSection } from '../classes/SitemapSection'
import { Command } from './Command'

interface Payload {
  item: SitemapPage | SitemapBlock | SitemapSection | SitemapNote,
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

  get items(): any[] {
    if (this.item instanceof SitemapPage) return this.item.parent.children
    if (this.item instanceof SitemapBlock) return this.item.page.blocks
    if (this.item instanceof SitemapSection) return this.item.sitemap.sections
    if (this.item instanceof SitemapNote) return this.item.sitemap.notes
    console.error('Cant delete', this.item)
    return []
  }

  run(runSuper = true) {
    // @ts-ignore
    this.index = this.items.indexOf(this.item)
    this.items.splice(this.index, 1)

    if (runSuper) super.run()
  }

  undo(runSuper = true) {
    // @ts-ignore
    this.items.splice(this.index, 0, this.item)

    if (runSuper) super.undo()
  }
}
