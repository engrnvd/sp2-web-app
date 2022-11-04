import type { DropSpace } from 'src/classes/DropSpace'
import type { SitemapPage } from 'src/classes/SitemapPage'
import type { SitemapSection } from 'src/classes/SitemapSection'
import { Command } from './Command'

export class DropPageCommand extends Command {
  description = ''
  declare payload: Payload
  oldParent: SitemapPage | SitemapSection = null
  oldIndex: number = null
  newIdx: number = null
  newParent: SitemapPage | SitemapSection = null

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload

    const { dropSpace, draggedPage } = this.payload
    const { location, page } = dropSpace

    this.oldParent = draggedPage.parent
    this.oldIndex = draggedPage.index

    if (location === 'over') {
      this.newParent = page
      this.newIdx = page.children.length
    } else if (location === 'before') {
      this.newParent = page.parent
      this.newIdx = page.index === 0 ? page.index : page.index - 1
    } else {
      this.newParent = page.parent
      this.newIdx = this.newParent === draggedPage.parent && draggedPage.index < page.index ? page.index : page.index + 1
    }
  }

  label(): string {
    return `Drop page ${this.payload.dropSpace.location} ${this.payload.dropSpace.page.name}`
  }

  run() {
    const { draggedPage } = this.payload

    this.oldParent.removeChildPage(draggedPage)
    this.newParent.addChildPageAt(this.newIdx, draggedPage)

    super.run()
  }

  undo() {
    const { draggedPage } = this.payload

    this.newParent.removeChildPage(draggedPage)
    this.oldParent.addChildPageAt(this.oldIndex, draggedPage)

    super.undo()
  }
}

interface Payload {
  dropSpace: DropSpace,
  draggedPage: SitemapPage,
}
