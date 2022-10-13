import type { SitemapBlock } from '../classes/SitemapBlock'
import type { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

interface Payload {
  block: SitemapBlock,
  index: number,
}

export class AddBlockCommand extends Command {
  description = 'Add new block'
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  run() {
    const block: SitemapBlock = this.payload.block
    const index: number = this.payload.index
    const page: SitemapPage = block.page

    page.blocks.splice(index, 0, block)

    super.run()
  }

  undo() {
    const block: SitemapBlock = this.payload.block
    const page: SitemapPage = block.page

    page.blocks.splice(page.blocks.indexOf(block), 1)

    super.undo()
  }
}
