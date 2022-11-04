import { SitemapNote } from 'src/classes/SitemapNote'
import { SitemapBlock } from '../classes/SitemapBlock'
import { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

type ClonableItem = SitemapPage | SitemapBlock | SitemapNote

interface Payload {
  item: ClonableItem,
}

export class DuplicateItemCommand extends Command {
  description = ''
  clonedItem: ClonableItem = null
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  label(): string {
    return `Duplicate ${this.item._type}`
  }

  get item() {
    return this.payload.item
  }

  get items(): ClonableItem[] {
    if (this.item instanceof SitemapPage) return this.item.parent.children
    if (this.item instanceof SitemapBlock) return this.item.page.blocks
    if (this.item instanceof SitemapNote) return this.item.sitemap.notes
    console.error('Cant duplicate', this.item)
    return []
  }

  getClonedItem(): ClonableItem {
    if (this.item instanceof SitemapPage) return new SitemapPage(this.item.sitemap, this.item.toData(), this.item.parent)
    if (this.item instanceof SitemapBlock) return new SitemapBlock(this.item.page, this.item.toData())
    if (this.item instanceof SitemapNote) return new SitemapNote(this.item.sitemap, {
      text: this.item.text + ' Copy',
      color: this.item.color,
      left: this.item.left + 20,
      top: this.item.top + 20,
    })
    return null
  }

  run() {
    this.clonedItem = this.getClonedItem()
    if (!this.clonedItem) return
    const index = this.items.indexOf(this.item) + 1
    this.items.splice(index, 0, this.clonedItem)

    super.run()
  }

  undo() {
    this.items.splice(this.items.indexOf(this.clonedItem), 1)
    super.undo()
  }
}
