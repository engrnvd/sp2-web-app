import { cssFontSize, cssVar } from '../helpers/misc'
import { colorHelper } from '../U/helpers/color-helper'
import { CanvasItem } from './canvas/CanvasItem'
import type { SitemapPage } from './SitemapPage'

export class SitemapBlock {
  page: SitemapPage
  _type = 'block'
  name: string = ''
  body: string = ''
  color: string = ''
  wireframe: any
  ci: CanvasItem = null

  constructor(page: SitemapPage, data: Partial<SitemapBlock>) {
    this.page = page
    try {
      for (const key in data) {
        this[key] = data[key]
      }

      const fontSize = cssFontSize() * 0.75
      this.ci = new CanvasItem(this.page.sitemap.canvas, {
        top: 0,
        fontSize,
        paddingX: fontSize * 0.5,
        paddingY: fontSize * 0.5,
        height: 0,
        fillColor: this.color,
        text: this.name,
        textColor: cssVar('--light'),
        selectable: true,
        editable: true,
        hoverable: true,
        hoverOffset: this.page.styles.blockGap,
        meta: this,
      })
    } catch (e) {
      console.error('Malformed block data.', e, data)
    }
  }

  toData() {
    return {
      name: this.name,
      color: this.color,
      body: this.body,
      wireframe: this.wireframe,
    }
  }

  update() {
    const parent = this.page.ci
    const { blockGap, blockHeight, headerHeight } = this.page.styles
    const index = this.page.blocks.indexOf(this)
    this.ci.text = this.name
    this.ci.fillColor = this.color
    this.ci.textColor = colorHelper.isLight(this.color) ? cssVar('--dark') : cssVar('--light')

    this.ci.left = parent.left + parent.paddingX
    this.ci.height = blockHeight
    this.ci.width = parent.width - parent.paddingX * 2
    this.ci.top = parent.top + headerHeight + (blockHeight + blockGap) * (index + 1)

    return this
  }

  draw() {
    this.ci.draw()
  }
}
