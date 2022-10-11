import { defineStore } from 'pinia'
import { FetchRequest } from 'src/helpers/fetch-request'
import { useSitemapsStore } from 'src/views/projects/store'
import type { ApmCanvas } from '../classes/canvas/ApmCanvas'
import type { Sitemap } from '../classes/Sitemap'
import { SitemapBlock } from '../classes/SitemapBlock'
import { SitemapPage } from '../classes/SitemapPage'

export const useAppStore = defineStore('app', {
  state: () => ({
    sitemap: null as Sitemap | null,
    sitemapReq: new FetchRequest('', 'GET'),
  }),
  getters: {
    canvas(): ApmCanvas | null {
      // @ts-ignore
      return this.sitemap?.canvas
    },
    hasHoveredPage() {
      // @ts-ignore
      return this.canvas?.hoveredItem?.meta instanceof SitemapPage
    },
    hasHoveredBlock() {
      // @ts-ignore
      return this.canvas?.hoveredItem?.meta instanceof SitemapBlock
    },
  },
  actions: {
    setSitemap(sitemap: Sitemap) {
      this.sitemap = sitemap
    },
    updateSitemapInListing() {
      let sitemaps = useSitemapsStore()
      // @ts-ignore
      if (!this.sitemap || !sitemaps.req.data.data) return
      // @ts-ignore
      let map = sitemaps.req.data.data.find(sm => sm.id === this.sitemap.id)
      if (map) {
        for (const key in this.sitemap) {
          // @ts-ignore
          map[key] = this.sitemap[key]
        }
        map.updated_at = new Date()
      }
    },
  },
})
