import { useAppStore } from 'src/stores/app.store'
import { AddBlockCommand } from '../commands/AddBlockCommand'
import { AddPageCommand } from '../commands/AddPageCommand'
import { CollapsePageCommand } from '../commands/CollapsePageCommand'
import { cssFontSize, cssVar } from '../helpers/misc'
import { defaultBlock, defaultPage, sitemapConfig } from '../helpers/sitemap-helper'
import { colorHelper } from '../U/helpers/color-helper'
import { canvasHelper } from './canvas/canvas-helper'
import { CanvasItem } from './canvas/CanvasItem'
import { Connection } from './canvas/Connection'
import type { Sitemap } from './Sitemap'
import { SitemapBlock } from './SitemapBlock'

export class SitemapPage {
  sitemap: Sitemap
  parent: SitemapPage
  _type = 'page'
  name: string = ''
  color: string = '#03a9f4'
  link: string = ''
  collapsed: Boolean = false
  blocks: SitemapBlock[] = []
  children: SitemapPage[] = []
  // @ts-ignore
  ci: CanvasItem = null
  // @ts-ignore
  header: CanvasItem = null

  // @ts-ignore
  constructor(sitemap: Sitemap, data: Object, parent: SitemapPage = null) {
    this.sitemap = sitemap
    this.parent = parent

    try {
      // @ts-ignore
      const { children, blocks, ...rest } = data

      for (const key in rest) {
        // @ts-ignore
        this[key] = rest[key]
      }

      if (children) {
        children.forEach((child: SitemapPage) => {
          this.children.push(new SitemapPage(this.sitemap, child, this))
        })
      }
      if (blocks) {
        blocks.forEach((block: Object) => {
          this.blocks.push(new SitemapBlock(this, block))
        })
      }

      const { width, fontSize, paddingX, paddingY, borderRadius, borderWidth, headerHeight } = this.styles
      this.ci = new CanvasItem(this.sitemap.canvas, {
        left: 0,
        top: 0,
        width,
        fontSize: fontSize,
        paddingX,
        paddingY,
        height: 0,
        borderRadius: [borderRadius, borderRadius, borderRadius, borderRadius],
        borderColor: this.color,
        borderWidth,
        text: this.name,
        textBold: true,
        textColor: this.color,
        hoverable: true,
        hoverOffset: fontSize,
        selectable: true,
        editable: true,
        meta: this,
      })

      this.header = new CanvasItem(this.sitemap.canvas, {
        left: 0,
        top: 0,
        height: headerHeight,
        width,
        hoverable: false,
        selectable: false,
        editable: false,
        meta: this,
        fillColor: this.color,
        fontSize: headerHeight / 2,
        paddingY: headerHeight / 4,
        textBold: true,
        paddingX: paddingX / 2,
        text: '● ● ●',
        textColor: cssVar('--light'),
        borderRadius: [borderRadius, borderRadius, 0, 0]
      })
    } catch (e) {
      console.error('Malformed page data.', e, data)
    }
  }

  get isRoot(): boolean {
    return !this.parent
  }

  get styles() {
    const app = useAppStore()
    const ctx = this.ci?.canvas?.ctx
    const bodyFontSize = cssFontSize()
    const fontSize = bodyFontSize * 0.75
    if (ctx) ctx.font = `${fontSize}px ${cssVar('--font')}`
    const width = app.simpleView && ctx ? Math.ceil(ctx.measureText(this.name).width) + 4 : bodyFontSize * 11
    const paddingY = fontSize * 0.5
    const blockHeight = fontSize + paddingY * 2
    const headerHeight = bodyFontSize * 0.5
    const blockGap = sitemapConfig.block.gap
    return {
      width,
      height: app.simpleView ? bodyFontSize + 8 : headerHeight + paddingY + (this.blocks.length + 2) * (blockHeight + blockGap) + blockGap,
      gap: sitemapConfig.page.gap,
      fontSize,
      paddingX: app.simpleView ? 0 : fontSize,
      paddingY: app.simpleView ? 4 : fontSize * 0.5 + headerHeight,
      borderRadius: 0,
      blockHeight,
      headerHeight,
      borderWidth: app.simpleView ? 0 : 2,
      blockGap,
    }
  }

  get childrenWidth(): number {
    const { width, gap } = this.styles
    return this.children.length && !this.collapsed ? this.children.reduce((w, child) => w + child.childrenWidth + gap, 0) - gap : width
  }

  get childrenHeight(): number {
    const { height, gap } = this.styles
    return this.children.length && !this.collapsed ? this.children.reduce((h, child) => h + child.childrenHeight + gap, height) : height
  }

  get shadedColor() {
    let color = this.color
    if (colorHelper.isLight(color)) color = colorHelper.darken(color, 30)
    return color
  }

  get index() {
    return this.parent?.children?.indexOf(this) || -1
  }

  get previousPage() {
    return this.index > 0 ? this.parent.children[this.index - 1] : null
  }

  toData(): Object {
    return {
      name: this.name,
      color: this.color,
      link: this.link,
      collapsed: this.collapsed,
      blocks: this.blocks.map(b => b.toData()),
      children: this.children.map(ch => ch.toData()),
    }
  }

  updateVertical() {
    const parent = this.parent
    const { height, gap, width } = this.styles
    const ci = this.ci
    const previousPage = this.previousPage

    const rootTop = sitemapConfig.root.top
    const rootLeft = sitemapConfig.root.left

    ci.height = height
    ci.text = this.name
    this.header.fillColor = ci.borderColor = ci.textColor = this.shadedColor

    if (this.isRoot) {
      this.header.top = ci.top = rootTop
      this.header.left = ci.left = rootLeft
      return
    }

    const leftGap = width / 2
    this.header.left = ci.left = (parent.isRoot ? rootLeft : parent.ci.left) + leftGap
    this.header.top = ci.top = (previousPage ? previousPage.ci.top + previousPage.childrenHeight : parent.ci.bottom) + gap
  }

  updateHorizontal() {
    const parent = this.parent
    const canvas = this.sitemap.canvas
    const { width, gap } = this.styles
    const ci = this.ci

    if (this.isRoot) {
      this.header.top = ci.top = sitemapConfig.root.top
      this.header.left = ci.left = Math.round(canvas.width / 2 - width / 2)
      return
    }

    const startLeft = parent.ci.cx - parent.childrenWidth / 2
    const previousPage = this.previousPage
    this.header.left = ci.left = Math.round(previousPage ? previousPage.ci.left + previousPage.childrenWidth / 2 + this.childrenWidth / 2 + gap : startLeft)
    this.header.top = ci.top = Math.round(parent.ci.bottom + gap)
  }

  update() {
    const { height, width, paddingX, paddingY, borderWidth, borderRadius } = this.styles
    const ci = this.ci
    ci.height = height
    ci.width = width
    ci.paddingX = paddingX
    ci.paddingY = paddingY
    ci.borderWidth = borderWidth
    ci.borderRadius = [borderRadius, borderRadius, borderRadius, borderRadius]
    ci.text = this.name
    this.header.fillColor = ci.borderColor = ci.textColor = this.shadedColor

    const app = useAppStore()
    if (app.sitemapView === 'Horizontal') this.updateHorizontal()
    else this.updateVertical()

    if (this.blocks) this.blocks.forEach(b => b.update())
    if (this.children) this.children.forEach(p => p.update())

    return this
  }

  draw() {
    const simpleView = useAppStore().simpleView
    this.ci.draw()

    if (!simpleView) {
      this.header.draw()
    }

    if (this.children && !this.collapsed) this.children.forEach(p => {
      p.draw()
      new Connection(this.ci, p.ci).draw()
    })

    if (!simpleView) {
      if (this.collapsed) this.drawCollapsedState()
      if (this.blocks) this.blocks.forEach(b => b.draw())
    }

    // update canvas points
    const item = this.ci
    if (item.left < item.canvas.minX) item.canvas.minX = item.left
    if (item.right > item.canvas.maxX) item.canvas.maxX = item.right
    if (item.top < item.canvas.minY) item.canvas.minY = item.top
    if (item.bottom > item.canvas.maxY) item.canvas.maxY = item.bottom
  }

  drawCollapsedState() {
    const ctx = this.ci.canvas.ctx
    const fontSize = cssFontSize() * 0.5
    ctx.fillStyle = cssVar('--primary')
    canvasHelper.circle(ctx, this.ci.left, this.ci.bottom, fontSize)
    ctx.fill()
    ctx.textBaseline = 'top'
    ctx.fillStyle = cssVar('--light')
    ctx.font = `${fontSize}px ${cssVar('--font')}`
    const text = String(this.children.length)
    const textW = ctx.measureText(text).width
    ctx.fillText(text, this.ci.left - textW / 2, this.ci.bottom - fontSize / 2)
  }

  addChildAt(index: number, data = {}) {
    const page = new SitemapPage(this.sitemap, defaultPage(data), this)
    new AddPageCommand({ page, index }).execute()
    this.sitemap.canvas.setEditedItem(this.children[index].ci)
    return page
  }

  addChild(childPageData = {}) {
    return this.addChildAt(this.children.length, childPageData)
  }

  addSibling(location: 'before' | 'after' = 'after') {
    let idx = this.parent.children.indexOf(this)
    if (location === 'after') idx++
    return this.parent.addChildAt(idx)
  }

  addBlockAt(index: number, blockData = {}) {
    const block = new SitemapBlock(this, defaultBlock(blockData))
    new AddBlockCommand({ block, index }).execute()
    return block
  }

  addBlock(blockData = {}) {
    return this.addBlockAt(this.blocks.length, blockData)
  }

  toggleCollapse() {
    new CollapsePageCommand({ page: this }).execute()
  }

}
