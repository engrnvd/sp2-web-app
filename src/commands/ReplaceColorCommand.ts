import type { CanvasItem } from 'src/classes/canvas/CanvasItem'
import type { SitemapBlock } from 'src/classes/SitemapBlock'
import type { SitemapPage } from 'src/classes/SitemapPage'
import { SitemapSection } from 'src/classes/SitemapSection'
import { useAppStore } from 'src/stores/app.store'
import { Command } from './Command'

interface Payload {
  color: string,
  newColor: string,
}

export class ReplaceColorCommand extends Command {
  description = 'Replace color'
  declare payload: Payload
  selection: Set<CanvasItem> = null

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  isSection(item) {
    return item instanceof SitemapSection
  }

  setItemColor(item: SitemapPage | SitemapBlock | SitemapSection, color, newColor, recursive = true) {
    if (recursive) {
      // @ts-ignore
      if (item.blocks?.length) item.blocks.forEach(b => this.setItemColor(b, color, newColor))
      // @ts-ignore
      if (item.children?.length) item.children.forEach(c => this.setItemColor(c, color, newColor))
    }

    // @ts-ignore
    if (this.isSection(item) || item.color !== color) return
    // @ts-ignore
    item.color = newColor
  }

  replaceColor(color, newColor) {
    // only selection
    if (this.selection) {
      this.selection.forEach(item => this.setItemColor(item.meta, color, newColor, false))
      return
    }

    // replace in the whole sitemap
    const app = useAppStore()
    app.sitemap.tree.forEach(page => this.setItemColor(page, color, newColor))
    app.sitemap.sections.forEach(s => this.setItemColor(s, color, newColor))
  }

  run() {
    const app = useAppStore()

    // should we replace all the colors or just for the selected items?
    if (app.canvas.selection.size > 0) this.selection = app.canvas.selection

    this.replaceColor(this.payload.color, this.payload.newColor)
    super.run()
  }

  undo() {
    this.replaceColor(this.payload.newColor, this.payload.color)
    super.undo()
  }
}
