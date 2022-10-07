import { SitemapPage } from '../classes/SitemapPage'
import { Command } from './Command'

export class CollapsePageCommand extends Command {
  description = 'Collapse page'

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
