import { canvasHelper } from 'src/classes/canvas/canvas-helper'
import { cssFontSize, cssVar } from 'src/helpers/misc'
import { CanvasItem } from './canvas/CanvasItem'
import type { Sitemap } from './Sitemap'
import { SitemapPage } from './SitemapPage'

export class SitemapSection {
  _type = 'section'
  sitemap: Sitemap
  name: string = ''
  children: SitemapPage[] = []
  ci: CanvasItem = null

  constructor(sitemap: Sitemap, data) {
    this.sitemap = sitemap
    try {
      for (const key in data) {
        if (key === 'pages') {
          for (const page of data.children) {
            this.children.push(new SitemapPage(this.sitemap, page))
          }
        } else {
          this[key] = data[key]
        }
      }

      this.ci = new CanvasItem(this.sitemap.canvas, {
        text: this.name,
        fillColor: cssVar('--body-bg'),
        textColor: cssVar('--muted'),
        editable: true,
        selectable: true,
        hoverable: true,
      })
    } catch (e) {
      console.error('Malformed section data.', e, data)
    }
  }

  update() {
    const ci = this.ci
    const canvas = this.sitemap.canvas
    const fontSize = cssFontSize()
    ci.fontSize = fontSize
    const paddingX = fontSize * 0.5
    const paddingY = fontSize * 0.5
    const width = paddingX * 2 + ci.textWidth

    ci.text = this.name
    ci.width = width
    ci.height = paddingY * 2 + fontSize
    ci.left = Math.ceil(canvas.width / 2 - width / 2)
    ci.top = Math.round(canvas.maxY) + fontSize * 5
    ci.paddingX = paddingX
    ci.paddingY = paddingY

    return this
  }

  drawLine() {
    const ci = this.ci
    const canvas = this.sitemap.canvas
    const ctx = canvas.ctx
    const y = Math.round(ci.top + ci.height / 2)
    const color = cssVar('--border-color')
    canvasHelper.line(ctx, canvas.minX, y, canvas.width, y, color, 1)
  }

  draw() {
    this.drawLine()
    this.ci.draw()
  }

  toData() {
    return {
      name: this.name,
      children: this.children.map(ch => ch.toData()),
    }
  }
}
