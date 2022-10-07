import { defineStore } from 'pinia'
import { ApmCanvas } from '../classes/canvas/ApmCanvas'
import { Sitemap } from '../classes/Sitemap'
import { SitemapBlock } from '../classes/SitemapBlock'
import { SitemapPage } from '../classes/SitemapPage'

export const useAppStore = defineStore('app', {
  state: () => ({
    sitemap: null as Sitemap | null,
  }),
  getters: {
    canvas(): ApmCanvas | null {
      return this.sitemap?.canvas
    },
    hasHoveredPage() {
      return this.canvas?.hoveredItem?.meta instanceof SitemapPage
    },
    hasHoveredBlock() {
      return this.canvas?.hoveredItem?.meta instanceof SitemapBlock
    },
  },
  actions: {
    setSitemap(sitemap: Sitemap) {
      this.sitemap = sitemap
    }
  },
})
