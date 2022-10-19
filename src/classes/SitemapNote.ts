import { cssFontSize, cssVar } from 'src/helpers/misc'
import { CanvasItem } from './canvas/CanvasItem'
import type { Sitemap } from './Sitemap'

export class SitemapNote {
  _type = 'note'
  sitemap: Sitemap
  ci: CanvasItem = null
  text: string = ''
  left: number = 0
  top: number = 0

  constructor(sitemap: Sitemap, data: Partial<SitemapNote>) {
    this.sitemap = sitemap
    try {
      for (const key in data) {
        this[key] = data[key]
      }

      const fontSize = cssFontSize()
      const paddingX = fontSize
      const paddingY = fontSize
      this.ci = new CanvasItem(this.sitemap.canvas, {
        text: this.text,
        fontSize: fontSize * 0.75,
        width: paddingX * 2 + fontSize * 10,
        height: paddingY * 2 + fontSize,
        paddingX,
        paddingY,
        fillColor: '#ffeb3a',
        textColor: cssVar('--main-text-color'),
        editable: true,
        selectable: true,
        hoverable: true,
        draggable: true,
        meta: this,
      })
    } catch (e) {
      console.error('Malformed note data.', e, data)
    }
  }

  update() {
    const ci = this.ci

    ci.text = this.text
    ci.left = this.left
    ci.top = this.top

    return this
  }

  draw() {
    this.ci.draw()
  }

  toData() {
    return {
      text: this.text,
      top: this.top,
      left: this.left,
    }
  }
}
