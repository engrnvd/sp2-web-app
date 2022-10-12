import { SitemapBlock } from '../classes/SitemapBlock'
import { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

export class DuplicateItemCommand extends Command {
  description = ''
  clonedItem = null

  label(): string {
    return `Duplicate ${this.item._type}`
  }

  get item(): SitemapPage | SitemapBlock {
    return this.payload.item
  }

  get items(): SitemapPage[] | SitemapBlock[] {
    if (this.item instanceof SitemapPage) return this.item.parent.childIds
    if (this.item instanceof SitemapBlock) return this.item.page.blocks
    console.error('Cant duplicate', this.item)
    return []
  }

  getClonedItem(): SitemapPage | SitemapBlock {
    if (this.item instanceof SitemapPage) return new SitemapPage(this.item.sitemap, {
      ...this.item.toData(),
      id: undefined
    }, this.item.parent)
    if (this.item instanceof SitemapBlock) return new SitemapBlock(this.item.page, {
      ...this.item.toData(),
      id: undefined
    })
    return null
  }

  run() {
    this.clonedItem = this.getClonedItem()
    if (!this.clonedItem) return
    // @ts-ignore
    const index = this.items.indexOf(this.item) + 1
    this.items.splice(index, 0, this.clonedItem)

    super.run()
  }

  undo() {
    this.items.splice(this.items.indexOf(this.clonedItem), 1)

    super.undo()
  }
}
