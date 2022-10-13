import { defineStore } from 'pinia'
import { CanvasDownloader } from 'src/classes/canvas/CanvasDownloader'
import { FetchRequest } from 'src/helpers/fetch-request'
import { _snakeCase } from 'src/helpers/string-helper'
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
    downloadPng() {
      return new CanvasDownloader(this.sitemap).downloadImage({
        name: _snakeCase(this.sitemap.name),
        bg: '#fff'
      })
    },
    downloadPdf() {
      return new CanvasDownloader(this.sitemap).downloadPdf({
        name: _snakeCase(this.sitemap.name),
        bg: '#fff'
      })
    },
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
