import { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

interface Payload {
  page: Partial<SitemapPage>,
  index: number
}

export class AddPageCommand extends Command {
  description = 'Add new page'
  page: SitemapPage
  payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
    this.page = new SitemapPage(this.sitemap, this.payload.page)
  }

  run() {
    const index: number = this.payload.index

    let pages = this.page.parent?.childIds
    if (!pages) {
      console.log('Error: cant add page: ', this.page)
      return
    }

    this.sitemap.addPage(this.page)
    pages.splice(index, 0, this.page.id)

    super.run()
  }

  undo() {
    let pages = this.page.parent?.childIds
    if (!pages) {
      console.log('Error: cant undo add page: ', this.page)
      return
    }

    delete this.sitemap.pages[this.page.id]
    pages.splice(pages.indexOf(this.page.id), 1)

    super.undo()
  }
}
