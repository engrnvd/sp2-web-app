export class Connection {
  fromPage
  toPage

  constructor(from, to) {
    this.fromPage = from
    this.toPage = to
  }

  draw() {
    const startX = this.fromPage.ci.cx
    const startY = this.fromPage.ci.bottom
    const endX = this.toPage.ci.cx
    const endY = this.toPage.ci.top

    const ctx = this.fromPage.sitemap.canvas.ctx

    ctx.beginPath()
    ctx.strokeStyle = this.fromPage.shadedColor
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
}
