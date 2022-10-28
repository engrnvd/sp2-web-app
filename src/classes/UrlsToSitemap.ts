import type { SitemapPage } from 'src/classes/SitemapPage'
import { _titleCase } from 'src/helpers/string-helper'

export interface UrlToSitemapData {
  url: string,
  last_modified: string,
}

export class UrlsToSitemap {
  website: string = ''
  data: UrlToSitemapData[]
  tree: Partial<SitemapPage>[] = []

  constructor(website: string, data: UrlToSitemapData[]) {
    this.data = data
    this.website = website
  }

  parse() {
    this.tree.push({
      name: 'Home',
      link: this.website.replace(/\/$/, '') + '/',
      children: [],
    })
    for (const urlData of this.data) {
      this.parseItem(urlData)
    }

    return {
      name: this.website.replace(/https?\:\/\//, '').replace(/\/$/, ''),
      tree: this.tree
    }
  }

  parseItem(item: UrlToSitemapData) {
    if (!item.url || item.url === '/') {
      if (item.last_modified) {
        this.tree[0].last_modified = item.last_modified
      }
      return
    }

    const pageNames = item.url.replace(/^\//, '').split('/').filter(name => !!name.length)
    const totalPages = pageNames.length
    let index = 0
    let currentPage = this.tree[0]
    while (index < totalPages) {
      let childName = pageNames[index]
      currentPage = this.addChild(currentPage, childName, item)
      index++
    }
  }

  addChild(currentPage: Partial<SitemapPage>, childName: string, item: UrlToSitemapData) {
    let name = _titleCase(childName)
    let page = currentPage.children.find(p => p.name === name)
    if (!page) {
      // @ts-ignore
      page = {
        name,
        link: currentPage.link.replace(/\/$/, '') + '/' + childName,
        last_modified: item.last_modified,
        children: [],
      }
      currentPage.children.push(page)
    }
    return page
  }
}
