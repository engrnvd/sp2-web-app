import type { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

export class AddPageCommand extends Command {
  description = 'Add new page'

  run() {
    const page: SitemapPage = this.payload.page
    const index: number = this.payload.index

    let pages = page.parent?.childIds
    if (!pages) {
      console.log('Error: cant add page: ', page)
      return
    }

    page.sitemap.addPage(page)
    pages.splice(index, 0, page.id)

    super.run()
  }

  undo() {
    const page: SitemapPage = this.payload.page

    let pages = page.parent?.childIds
    if (!pages) {
      console.log('Error: cant undo add page: ', page)
      return
    }

    delete page.sitemap.pages[page.id]
    pages.splice(pages.indexOf(page.id), 1)

    super.undo()
  }
}
