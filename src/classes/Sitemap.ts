import { ApmCanvas } from './canvas/ApmCanvas'
import { SitemapPage } from './SitemapPage'
import { SitemapSection } from './SitemapSection'

export class Sitemap {
  canvas: ApmCanvas
  id: any
  name: string
  isTemplate: Boolean = false
  tree: SitemapPage[] = []
  sections: SitemapSection[] = []
  createdAt: any
  updatedAt: any
  ownerId: any

  constructor(canvas: ApmCanvas, data: any = {}) {
    this.canvas = canvas

    try {
      for (const key in data) {
        if (key === 'tree') {
          data.tree.forEach((page, index) => {
            this.tree.push(new SitemapPage(this, page))
          })
        } else if (key === 'sections') {
          for (const section of data.sections) {
            this.sections.push(new SitemapSection(this, section))
          }
        } else {
          this[key] = data[key]
        }
      }
    } catch (e) {
      console.error('Malformed sitemap data.', e, data)
    }
  }

  draw() {
    const canvas = this.canvas
    const ctx = canvas.ctx
    ctx.textBaseline = 'top'
    ctx.save()
    this.canvas.clear()
    ctx.translate(canvas.origin.x, canvas.origin.y)
    ctx.scale(canvas.zoom.scale, canvas.zoom.scale)

    let minX = null
    let minY = null
    let maxX = null
    let maxY = null
    this.tree.forEach(page => {
      page.update().draw()
      // update canvas points
      const item = page.ci
      if (minX === null || item.left < minX) minX = item.left
      if (maxX === null || item.right > maxX) maxX = item.right
      if (minY === null || item.top < minY) minY = item.top
      if (maxY === null || item.bottom > maxY) maxY = item.bottom
    })
    if (minX) canvas.minX = minX
    if (maxX) canvas.maxX = maxX
    if (minY) canvas.minY = minY
    if (maxY) canvas.maxY = maxY

    ctx.restore()
  }
}
