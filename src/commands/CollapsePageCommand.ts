import type { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

interface Payload {
  page: SitemapPage,
}

export class CollapsePageCommand extends Command {
  description = 'Collapse page'
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  run() {
    const page: SitemapPage = this.payload.page

    page.collapsed = !page.collapsed

    super.run()
  }

  undo() {
    const page: SitemapPage = this.payload.page

    page.collapsed = !page.collapsed

    super.undo()
  }
}
