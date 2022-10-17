import type { SitemapBlock } from 'src/classes/SitemapBlock'
import type { SitemapPage } from 'src/classes/SitemapPage'
import { useAppStore } from 'src/stores/app.store'
import { Command } from './Command'

interface Payload {
  color: string,
  newColor: string,
}

export class ReplaceColorCommand extends Command {
  description = 'Replace color'
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  setItemColor(item: SitemapPage | SitemapBlock, color, newColor) {
    // @ts-ignore
    if (item.blocks?.length) item.blocks.forEach(b => this.setItemColor(b, color, newColor))
    // @ts-ignore
    if (item.children?.length) item.children.forEach(c => this.setItemColor(c, color, newColor))

    if (item.color !== color) return
    item.color = newColor
  }

  replaceColor(color, newColor) {
    const app = useAppStore()
    app.sitemap.tree.forEach(page => {
      this.setItemColor(page, color, newColor)
    })
  }

  run() {
    this.replaceColor(this.payload.color, this.payload.newColor)
    super.run()
  }

  undo() {
    this.replaceColor(this.payload.newColor, this.payload.color)
    super.undo()
  }
}
