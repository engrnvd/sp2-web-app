import { cssVar } from 'src/helpers/misc'
import { colorHelper } from 'src/U/helpers/color-helper'
import type { ApmCanvas } from './ApmCanvas'
import { canvasHelper } from './canvas-helper'

export class CanvasItem {
  canvas: ApmCanvas
  meta: any

  // rect
  width: number
  height: number
  left: number
  top: number
  fillColor: string
  borderWidth = 0
  borderColor: string
  borderRadius = [0, 0, 0, 0]
  // text
  textColor: string
  text: string
  textBold: Boolean = false
  fontSize: number
  paddingX = 0
  paddingY = 0

  hoverable = false
  hoverOffset: number = 0
  editable = false
  selectable = false
  draggable = false

  constructor(canvas: ApmCanvas, data: Partial<CanvasItem>) {
    this.canvas = canvas

    for (const key in data) {
      this[key] = data[key]
    }
  }

  get textWidth() {
    this.canvas.ctx.font = `${this.fontSize}px ${cssVar('--font')}`
    return Math.ceil(this.canvas.ctx.measureText(this.text).width)
  }

  get right() {
    return this.left + this.width
  }

  get bottom() {
    return this.top + this.height
  }

  get cx() {
    return this.left + this.width / 2
  }

  get cy() {
    return this.top + this.height / 2
  }

  get relCx() {
    return this.relLeft + this.relWidth / 2
  }

  get relCy() {
    return this.relTop + this.relHeight / 2
  }

  get relLeft() {
    return this.canvas.origin.x + (this.left * this.canvas.zoom.scale)
  }

  get relTop() {
    return this.canvas.origin.y + (this.top * this.canvas.zoom.scale)
  }

  get relRight() {
    return this.canvas.origin.x + (this.right * this.canvas.zoom.scale)
  }

  get relBottom() {
    return this.canvas.origin.y + (this.bottom * this.canvas.zoom.scale)
  }

  get relWidth() {
    return this.width * this.canvas.zoom.scale
  }

  get relHeight() {
    return this.height * this.canvas.zoom.scale
  }

  get isHoveredItem() {
    return this.canvas.hoveredItem === this
  }

  get isSelectedItem() {
    return this.canvas.selectedItem === this
  }

  get isEditedItem() {
    return this.canvas.editedItem === this
  }

  get hasMouseOver() {
    const mouse = this.canvas.mouse
    let mouseX = mouse.x - this.canvas.origin.x
    let mouseY = mouse.y - this.canvas.origin.y

    let itemL = this.left - this.hoverOffset
    let itemT = this.top - this.hoverOffset
    let itemB = this.bottom + this.hoverOffset
    let itemR = this.right + this.hoverOffset

    const scale = this.canvas.zoom.scale
    if (scale !== 1) {
      itemL *= scale
      itemT *= scale
      itemB *= scale
      itemR *= scale
    }

    return itemL < mouseX && mouseX < itemR
      && itemT < mouseY && mouseY < itemB
  }

  drawRect() {
    if (!this.fillColor && !this.borderWidth) return

    const ctx = this.canvas.ctx
    const br = this.borderRadius

    if (!br[0]) {
      if (this.fillColor) ctx.fillStyle = this.shadedColor(this.fillColor)
      if (this.borderColor) ctx.strokeStyle = this.shadedColor(this.borderColor)
      if (this.borderWidth) ctx.lineWidth = this.borderWidth
      if (this.fillColor) ctx.fillRect(this.left, this.top, this.width, this.height)
      if (this.borderColor || this.borderWidth) ctx.strokeRect(this.left, this.top, this.width, this.height)
      return
    }

    let cpR = 0.4475 * br[0] // ctrl pt ratio if r = 8 then cp = 3.58 = br * 0.4475

    ctx.beginPath()
    ctx.moveTo(this.left, this.top + br[0])
    if (br[0]) ctx.bezierCurveTo(this.left, this.top + cpR, this.left + cpR, this.top, this.left + br[0], this.top)
    let nextX = this.right - br[0]
    ctx.lineTo(nextX, this.top)

    cpR = 0.4475 * br[1]
    if (br[1]) ctx.bezierCurveTo(this.right - cpR, this.top, this.right, this.top + cpR, this.right, this.top + br[1])
    let nextY = this.bottom - br[2]
    ctx.lineTo(this.right, nextY)

    cpR = 0.4475 * br[2]
    if (br[2]) ctx.bezierCurveTo(this.right, this.bottom - cpR, this.right - cpR, this.bottom, this.right - br[2], this.bottom)
    nextX = this.left + br[3]
    ctx.lineTo(nextX, this.bottom)

    cpR = 0.4475 * br[3]
    if (br[3]) ctx.bezierCurveTo(this.left + cpR, this.bottom, this.left, this.bottom - cpR, this.left, this.bottom - br[3])
    nextY = this.top + br[0]
    ctx.lineTo(this.left, nextY)

    if (this.fillColor) ctx.fillStyle = this.shadedColor(this.fillColor)
    if (this.borderColor) ctx.strokeStyle = this.shadedColor(this.borderColor)
    if (this.borderWidth) ctx.lineWidth = this.borderWidth

    if (this.fillColor) ctx.fill()
    if (this.borderColor || this.borderWidth) ctx.stroke()
    ctx.closePath()
  }

  shadedColor(color) {
    return this.isHoveredItem ? colorHelper.darken(color, 20) : color
  }

  drawText() {
    if (!this.text) return

    const ctx = this.canvas.ctx
    ctx.fillStyle = this.fillColor ? this.textColor : this.shadedColor(this.textColor)
    ctx.textBaseline = 'top'
    ctx.font = `${this.fontSize}px ${cssVar('--font')}`
    if (this.textBold) ctx.font = `bold ${ctx.font}`
    canvasHelper.wrappedText(ctx, this.text, this.width, this.left + this.paddingX, this.top + this.paddingY, this.fontSize)
  }

  draw() {
    if (this.isOutOfScreen()) return
    this.update()
    this.drawRect()
    this.drawText()
  }

  isOutOfScreen() {
    return !this.canvas.isPointVisible(this.left, this.top)
      && !this.canvas.isPointVisible(this.right, this.bottom)
      && !this.canvas.isPointVisible(this.right, this.top)
      && !this.canvas.isPointVisible(this.left, this.bottom)
  }

  update() {
    if (!this.canvas.draggedItem) {
      if (this.hoverable && this.hasMouseOver) {
        this.canvas.setHoveredItem(this)
      } else if (this.isHoveredItem) {
        this.canvas.setHoveredItem(null)
      }
    }

    let selectedItems = this.canvas?.selection?.items || []
    if (this.canvas.draggedItem === this || (selectedItems.includes(this) && this.canvas.mouse.pressed)) {
      this.left += this.canvas.mouse.dx
      this.top += this.canvas.mouse.dy
    }
  }
}
