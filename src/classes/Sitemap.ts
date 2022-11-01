import { SitemapNote } from 'src/classes/SitemapNote'
import type { ApmCanvas } from './canvas/ApmCanvas'
import { SitemapPage } from './SitemapPage'
import { SitemapSection } from './SitemapSection'

export class Sitemap {
  canvas: ApmCanvas
  id: any
  name: string = ''
  is_template: Boolean = false
  archived: Boolean = false
  tree: SitemapPage[] = []
  sections: SitemapSection[] = []
  notes: SitemapNote[] = []
  created_at: any
  updated_at: any
  owner_id: any

  constructor(canvas: ApmCanvas, data: Partial<Sitemap> = {}) {
    this.canvas = canvas

    try {
      for (const key in data) {
        if (key === 'tree' && data.tree) {
          data.tree.forEach((page: Object) => {
            this.tree.push(new SitemapPage(this, page))
          })
        } else if (key === 'sections' && data.sections) {
          for (const section of data.sections) {
            this.sections.push(new SitemapSection(this, section))
          }
        } else if (key === 'notes' && data.notes) {
          for (const note of data.notes) {
            this.notes.push(new SitemapNote(this, note))
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
    canvas.clear()
    if (!canvas.draggedItem) canvas.resetMinAndMaxPoints()
    ctx.translate(canvas.origin.x, canvas.origin.y)
    ctx.scale(canvas.zoom.scale, canvas.zoom.scale)

    this.tree.forEach(page => page.update().draw())
    this.sections.forEach(section => section.update().draw())
    this.notes.forEach(note => note.update().draw())

    ctx.restore()
  }

  toData(): Object {
    return {
      name: this.name,
      is_template: this.is_template,
      tree: this.tree.map(p => p.toData()),
      sections: this.sections.map(s => s.toData()),
      notes: this.notes.map(n => n.toData()),
    }
  }
}
