import type { CanvasItem } from './canvas/CanvasItem'
import type { Sitemap } from './Sitemap'
import type { SitemapPage } from './SitemapPage'

export class SitemapSection {
  id: number = 0
  _type = 'section'
  sitemap: Sitemap
  name: string = ''
  childIds: SitemapPage[] = []
  // @ts-ignore
  ci: CanvasItem = null

  constructor(sitemap: Sitemap, data: any) {
    this.sitemap = sitemap
    try {
      for (const key in data) {
        // @ts-ignore
        this[key] = data[key]
      }
    } catch (e) {
      console.error('Malformed section data.', e, data)
    }
  }

  toData() {
    return {
      name: this.name,
      childIds: this.childIds,
    }
  }
}
