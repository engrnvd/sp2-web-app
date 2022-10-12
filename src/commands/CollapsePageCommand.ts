import type { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

interface Payload {
  pageId: number
}

export class CollapsePageCommand extends Command {
  description = 'Toggle collapse'
  payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  run() {
    const page: SitemapPage = this.sitemap.pages[this.payload.pageId]

    page.collapsed = !page.collapsed

    super.run()
  }

  undo() {
    const page: SitemapPage = this.sitemap.pages[this.payload.pageId]

    page.collapsed = !page.collapsed

    super.undo()
  }
}
