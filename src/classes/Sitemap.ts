import type { ApmCanvas } from './canvas/ApmCanvas'
import { SitemapPage } from './SitemapPage'
import { SitemapSection } from './SitemapSection'

export interface PageMap {
  [key: number]: SitemapPage;
}

export interface SectionMap {
  [key: number]: SitemapSection;
}

export interface SitemapCommand {
  label: string
  type: string
  payload: any
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
  commands: SitemapCommand[] = []

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

  async build() {
    for (const c of this.commands) {
      // @ts-ignore
      let commandClass = await import(`../commands/${c.type}`)
      let command = new commandClass[c.type](c.payload)
      command.run()
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

  mapToData(mapName: 'pages' | 'sections') {
    const res = []
    for (const id in this[mapName]) {
      res.push(this[mapName][id].toData())
    }
    return res
  }

  pagesData() {
    return this.mapToData('pages')
  }

  sectionsData() {
    return this.mapToData('sections')
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

    const page = this.pages[1]
    page.update().draw()

    ctx.restore()
  }
}
