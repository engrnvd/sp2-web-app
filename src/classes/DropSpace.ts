import { CanvasItem } from 'src/classes/canvas/CanvasItem'
import type { SitemapPage } from 'src/classes/SitemapPage'
import { sitemapConfig } from 'src/helpers/sitemap-helper'

export type DropSpaceLocation = 'before' | 'after' | 'over'

export class DropSpace {
  page: SitemapPage
  location: DropSpaceLocation
  ci: CanvasItem

  constructor(data: Partial<DropSpace>) {
    for (const key in data) {
      this[key] = data[key]
    }

    this.initCi()
  }

  update() {
    const pageCi = this.page.ci
    const canvas = pageCi.canvas
    const ci = this.ci
    if (canvas.draggedItem && ci.hasMouseOver) {
      ci.fillColor = 'rgba(0,0,0,0.25)'
      canvas.currentDropSpace = this
    } else {
      ci.fillColor = 'rgba(0,0,0,0.05)'
      if (canvas.currentDropSpace === this) {
        canvas.currentDropSpace = null
      }
    }
  }

  draw() {
    this.ci.draw()
  }

  initCi() {
    const ci = this.page.ci
    const offset = 3
    const width = (this.location === 'over' ? ci.width : sitemapConfig.page.gap) - offset * 2
    const left = this.location === 'before' ? ci.left - width - offset : (this.location === 'after' ? ci.right + offset : ci.left + offset)
    const top = ci.top
    this.ci = new CanvasItem(ci.canvas, {
      left: left,
      top: top,
      width: width,
      height: ci.height,
      meta: this,
    })
  }

}
