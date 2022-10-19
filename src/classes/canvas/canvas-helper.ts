export const canvasHelper = {
  roundedRect(ctx, x, y, width, height, radius) {
    let cornerRadius = { upperLeft: radius, upperRight: radius, lowerLeft: radius, lowerRight: radius }
    if (typeof radius === 'object') {
      cornerRadius.upperLeft = radius[0]
      cornerRadius.upperRight = radius[1]
      cornerRadius.lowerRight = radius[2]
      cornerRadius.lowerLeft = radius[3]
    }

    ctx.beginPath()
    ctx.moveTo(x + cornerRadius.upperLeft, y)
    ctx.lineTo(x + width - cornerRadius.upperRight, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight)
    ctx.lineTo(x + width, y + height - cornerRadius.lowerRight)
    ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height)
    ctx.lineTo(x + cornerRadius.lowerLeft, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft)
    ctx.lineTo(x, y + cornerRadius.upperLeft)
    ctx.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y)
    ctx.closePath()
  },
  line(ctx, x1, y1, x2, y2, color, width) {
    ctx.beginPath()
    ctx.strokeStyle = color
    if (width) ctx.lineWidth = width
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  },
  innerStrokeRect(ctx, x, y, w, h, lw) {
    ctx.rect(x, y, w, h)
    ctx.rect(x + lw, y + lw, w - lw * 2, h - lw * 2)
    ctx.fill('evenodd')
    ctx.strokeRect(x, y, w, h)
  },
  circle(ctx, x, y, radius) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, true)
  },
  getLines(ctx, text, maxWidth) {
    return text.split('\n').map(para => {
      let words = para.split(' ')
      let lines = []
      let currentLine = words[0]

      for (let i = 1; i < words.length; i++) {
        let word = words[i]
        let width = ctx.measureText(currentLine + ' ' + word).width
        if (width < maxWidth) {
          currentLine += ' ' + word
        } else {
          lines.push(currentLine)
          currentLine = word
        }
      }
      lines.push(currentLine)
      return lines
    }).flat()
  },
  wrappedText(ctx, text, maxWidth, x, y, fontSize) {
    const lines = this.getLines(ctx, text, maxWidth)
    lines.forEach((line, idx) => {
      ctx.fillText(line, x, y + fontSize * idx)
    })
    return lines
  },
}
