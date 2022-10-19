import { canvasHelper } from 'src/classes/canvas/canvas-helper'
import { HasChildPagesMixin } from 'src/classes/HasChildPages.mixin'
import { applyMixins, cssFontSize, cssVar } from 'src/helpers/misc'
import { CanvasItem } from './canvas/CanvasItem'
import type { Sitemap } from './Sitemap'
import { SitemapPage } from './SitemapPage'

export class SitemapSection {
  _type = 'section'
  name: string = ''
  children: SitemapPage[] = []

  constructor(sitemap: Sitemap, data) {
    this.sitemap = sitemap
    try {
      for (const key in data) {
        if (key === 'children') {
          for (const page of data.children) {
            let p = new SitemapPage(this.sitemap, page, this)
            this.children.push(p)
          }
        } else {
          this[key] = data[key]
        }
      }

      this.ci = new CanvasItem(this.sitemap.canvas, {
        text: this.name,
        editable: true,
        selectable: true,
        hoverable: true,
        meta: this,
      })
    } catch (e) {
      console.error('Malformed section data.', e, data)
    }
  }

  get isRoot() {
    return true
  }

  update() {
    const ci = this.ci
    const canvas = this.sitemap.canvas
    const fontSize = cssFontSize()
    ci.fontSize = fontSize
    const paddingX = fontSize
    const paddingY = fontSize * 0.5
    const width = paddingX * 2 + ci.textWidth

    ci.text = this.name.toUpperCase()
    ci.width = width
    ci.fillColor = cssVar('--body-bg')
    ci.textColor = cssVar('--muted')
    ci.height = paddingY * 2 + fontSize
    ci.left = Math.ceil(canvas.width / 2 - width / 2)
    ci.top = Math.round(canvas.maxY) + fontSize * 5
    ci.paddingX = paddingX
    ci.paddingY = paddingY

    if (this.children) this.children.forEach(p => p.update())

    return this
  }

  drawLine() {
    const ci = this.ci
    const canvas = this.sitemap.canvas
    const ctx = canvas.ctx
    const y = ci.top + ci.height / 2 - 0.5
    const color = cssVar('--border-color')
    canvasHelper.line(ctx, canvas.minX + ci.paddingX, y, canvas.width - ci.paddingX, y, color, 1)
  }

  draw() {
    this.drawLine()
    this.ci.draw()

    this.children.forEach(p => p.draw())
  }

  toData() {
    return {
      name: this.name,
      children: this.children.map(ch => ch.toData()),
    }
  }
}

applyMixins(SitemapSection, [HasChildPagesMixin])

export interface SitemapSection extends HasChildPagesMixin {
}
