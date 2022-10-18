import type { CanvasItem } from 'src/classes/canvas/CanvasItem'
import type { Sitemap } from 'src/classes/Sitemap'
import { SitemapPage } from 'src/classes/SitemapPage'
import { AddPageCommand } from 'src/commands/AddPageCommand'
import { defaultPage, sitemapConfig } from 'src/helpers/sitemap-helper'

export class HasChildPagesMixin {
  sitemap: Sitemap
  children: SitemapPage[] = []
  ci: CanvasItem = null

  get childrenWidth(): number {
    const gap = sitemapConfig.page.gap
    return this.children.length ? this.children.reduce((w, child) => w + child.childrenWidth + gap, 0) - gap : this.ci.width
  }

  get childrenHeight(): number {
    const gap = sitemapConfig.page.gap
    return this.children.length ? this.children.reduce((h, child) => h + child.childrenHeight + gap, this.ci.height) : this.ci.height
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
}
