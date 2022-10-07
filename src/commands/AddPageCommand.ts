import { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

export class AddPageCommand extends Command {
  description = 'Add new page'

  run() {
    const page: SitemapPage = this.payload.page
    const index: number = this.payload.index

    let pages = page.parent?.children
    if (!pages) {
      console.log('Error: cant add page: ', page)
      return
    }

    pages.splice(index, 0, page)

    super.run()
  }

  undo() {
    const page: SitemapPage = this.payload.page

    let pages = page.parent?.children
    if (!pages) {
      console.log('Error: cant undo add page: ', page)
      return
    }

    pages.splice(pages.indexOf(page), 1)

    super.undo()
  }
}
