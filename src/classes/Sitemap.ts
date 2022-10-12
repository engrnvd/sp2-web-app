import type { ApmCanvas } from './canvas/ApmCanvas'
import { SitemapPage } from './SitemapPage'
import { SitemapSection } from './SitemapSection'

export interface PageMap {
  [key: number]: SitemapPage;
}

export interface SectionMap {
  [key: number]: SitemapSection;
}

export class Sitemap {
  canvas: ApmCanvas
  id: any
  name: string = ''
  is_template: Boolean = false
  pages: PageMap = {}
  sections: SectionMap = {}
  created_at: any
  updated_at: any
  owner_id: any

  constructor(canvas: ApmCanvas, data: any = {}) {
    this.canvas = canvas

    try {
      for (const key in data) {
        if (key === 'pages' && data.pages) {
          for (const id in data.pages) {
            this.addPage(new SitemapPage(this, data.pages[id]))
          }
        } else if (key === 'sections' && data.sections) {
          for (const id in data.sections) {
            this.addSection(new SitemapSection(this, data.sections[id]))
          }
        } else {
          // @ts-ignore
          this[key] = data[key]
        }
      }
    } catch (e) {
      console.error('Malformed sitemap data.', e, data)
    }
  }

  addToMap(mapName: 'pages' | 'sections', item: SitemapPage | SitemapSection) {
    let ids = Object.keys(this[mapName])
    let maxId = ids.pop()
    // @ts-ignore
    item.id = item.id || 1 + parseInt(maxId)
    // @ts-ignore
    this[mapName][item.id] = item
  }

  addPage(page: SitemapPage) {
    this.addToMap('pages', page)
  }

  addSection(section: SitemapSection) {
    this.addToMap('sections', section)
  }

  draw() {
    const canvas = this.canvas
    const ctx = canvas.ctx
    ctx.textBaseline = 'top'
    ctx.save()
    this.canvas.clear()
    ctx.translate(canvas.origin.x, canvas.origin.y)
    ctx.scale(canvas.zoom.scale, canvas.zoom.scale)

    let minX: any = null
    let minY: any = null
    let maxX: any = null
    let maxY: any = null
    for (const id in this.pages) {
      const page = this.pages[id]
      page.update().draw()
      // update canvas points
      const item = page.ci
      if (minX === null || item.left < minX) minX = item.left
      if (maxX === null || item.right > maxX) maxX = item.right
      if (minY === null || item.top < minY) minY = item.top
      if (maxY === null || item.bottom > maxY) maxY = item.bottom
    }
    if (minX) canvas.minX = minX
    if (maxX) canvas.maxX = maxX
    if (minY) canvas.minY = minY
    if (maxY) canvas.maxY = maxY

    ctx.restore()
  }
}
