import type { SectionMap } from 'src/classes/Sitemap'
import { SitemapBlock } from '../classes/SitemapBlock'
import { SitemapPage } from '../classes/SitemapPage'
import { SitemapSection } from '../classes/SitemapSection'
import { Command } from './Command'

interface Payload {
  item: SitemapPage | SitemapBlock | SitemapSection
}

export class DeleteItemCommand extends Command {
  description = 'Delete item'
  index = -1
  // @ts-ignore
  payload: Payload

  constructor(payload: Payload) {
    super(payload)
  }

  label(): string {
    return `Delete ${this.item._type}`
  }

  get item(): SitemapPage | SitemapBlock | SitemapSection {
    return this.payload.item
  }

  get items(): number[] | SitemapBlock[] | SectionMap {
    if (this.item instanceof SitemapPage) return this.item.parent.childIds
    if (this.item instanceof SitemapBlock) return this.item.page.blocks
    if (this.item instanceof SitemapSection) return this.item.sitemap.sections
    console.error('Cant delete', this.item)
    return []
  }

  run() {
    if (this.item instanceof SitemapSection) {

    } else {
      // @ts-ignore
      this.index = this.items.indexOf(this.item)
      this.items.splice(this.index, 1)
    }

    super.run()
  }

  undo() {
    // @ts-ignore
    this.items.splice(this.index, 0, this.item)

    super.undo()
  }
}
