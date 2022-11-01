import type { CanvasItem } from 'src/classes/canvas/CanvasItem'
import type { Sitemap } from 'src/classes/Sitemap'
import { SitemapPage } from 'src/classes/SitemapPage'
import { AddPageCommand } from 'src/commands/AddPageCommand'
import { defaultPage, sitemapConfig } from 'src/helpers/sitemap-helper'

export class HasChildPagesMixin {
  sitemap: Sitemap
  children: SitemapPage[] = []
  ci: CanvasItem = null

  get fullWidth(): number {
    const gap = sitemapConfig.page.gap
    return this.children.length ? this.children.reduce((w, child) => w + child.fullWidth + gap, -gap) : this.ci.width
  }

  get fullHeight(): number {
    const gap = sitemapConfig.page.gap
    return this.children.length ? this.children.reduce((h, child) => h + child.fullHeight + gap, this.ci.height) : this.ci.height
  }

  addChildAt(index: number, data = {}) {
    // @ts-ignore
    const page = new SitemapPage(this.sitemap, defaultPage(data), this)
    new AddPageCommand({ page, index }).execute()
    this.sitemap.canvas.setEditedItem(this.children[index].ci)
    return page
  }

  addChild(childPageData = {}) {
    return this.addChildAt(this.children.length, childPageData)
  }

  addChildPageAt(idx: number, page: SitemapPage) {
    this.children.splice(idx, 0, page)
    // @ts-ignore
    page.parent = this
  }

  removeChildPage(page: SitemapPage) {
    this.children.splice(this.children.indexOf(page), 1)
  }
}
