import { SitemapBlock } from '../classes/SitemapBlock'
import type { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

interface Payload {
  pageId: number,
  block: Partial<SitemapBlock>,
  index: number
}

export class AddBlockCommand extends Command {
  description = 'Add new block'
  block: SitemapBlock
  payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
    this.block = new SitemapBlock(this.sitemap.pages[this.payload.pageId], this.payload.block)
  }

  run() {
    const index: number = this.payload.index
    const page: SitemapPage = this.block.page

    page.blocks.splice(index, 0, this.block)

    super.run()
  }

  undo() {
    const page: SitemapPage = this.block.page

    page.blocks.splice(page.blocks.indexOf(this.block), 1)

    super.undo()
  }
}
