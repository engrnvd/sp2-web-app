import type { CanvasItem } from 'src/classes/canvas/CanvasItem'
import { sitemapConfig } from 'src/helpers/sitemap-helper'
import { useAppStore } from 'src/stores/app.store'

export class Connection {
  fromItem: CanvasItem
  toItem: CanvasItem

  constructor(from, to) {
    this.fromItem = from
    this.toItem = to
  }

  drawHorizontal() {
    const startX = this.fromItem.cx
    const startY = this.fromItem.bottom
    const endX = this.toItem.cx
    const endY = this.toItem.top

    const ctx = this.fromItem.canvas.ctx

    ctx.beginPath()
    ctx.strokeStyle = this.fromItem.borderColor
    ctx.moveTo(startX, startY)
    const xDiff = endX - startX
    if (xDiff === 0) {
      ctx.lineTo(endX, endY)
      ctx.stroke()
      ctx.closePath()
      return
    }

    const midY = (endY + startY) / 2
    ctx.lineTo(startX, midY)
    ctx.lineTo(endX, midY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.closePath()
  }

  drawVertical() {
    let startX = this.fromItem.left + sitemapConfig.connection.offsetX
    let startY = this.fromItem.bottom
    let endX = this.toItem.left
    let endY = this.toItem.cy

    const ctx = this.fromItem.canvas.ctx

    ctx.beginPath()
    ctx.strokeStyle = this.fromItem.borderColor
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX, endY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.closePath()
  }

  draw() {
    const app = useAppStore()
    if (app.sitemapView === 'Vertical') this.drawVertical()
    else this.drawHorizontal()
  }
}
