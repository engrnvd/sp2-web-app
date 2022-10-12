import { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

interface Payload {
  page: SitemapPage,
  index?: number,
}

export class DeletePageCommand extends Command {
  description = 'Delete page'
  payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
    this.payload.index = this.childIds.indexOf(this.payload.page.id)
  }

  get childIds() {
    return this.payload.page.parent.childIds
  }

  run() {
    // @ts-ignore
    this.childIds.splice(this.payload.index, 1)
    delete this.sitemap.pages[this.payload.page.id]

    super.run()
  }

  undo() {
    this.sitemap.pages[this.payload.page.id] = new SitemapPage(this.sitemap, this.payload.page)
    // @ts-ignore
    this.childIds.splice(this.payload.index, 0, this.payload.page.id)

    super.undo()
  }
}
