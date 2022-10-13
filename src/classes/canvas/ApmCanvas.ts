import { _sleep } from 'src/helpers/misc'
import type { CanvasItem } from './CanvasItem'
import { CanvasSelection } from './CanvasSelection'
import { Mouse } from './Mouse'
import { Easing, Tween } from '@tweenjs/tween.js'

export class ApmCanvas {
  element: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width = 800
  height = 600
  minX = 0
  minY = 0
  maxX = 0
  maxY = 0
  origin = { x: 0, y: 0 }
  lastOrigin = { x: 0, y: 0 }
  zoom = { scale: 1, delta: 0.05, min: 0.20, max: 3 }
  mouse
  selection
  editedItem: CanvasItem = null
  selectedItem: CanvasItem = null
  draggedItem: CanvasItem = null
  hoveredItem: CanvasItem = null
  highlightedItem: CanvasItem = null

  constructor() {
    this.mouse = new Mouse()
    this.selection = new CanvasSelection()
  }

  initialize(element: HTMLCanvasElement) {
    this.element = element
    this.ctx = element.getContext('2d')
    this.updateCanvasSize()
    this.mouse.initialize(this)
  }

  get vpCenter() {
    const x = (-this.origin.x + this.width / 2) / this.zoom.scale
    const y = (-this.origin.y + this.height / 2) / this.zoom.scale
    return { x, y }
  }

  get vpRight() {
    return (-this.origin.x + this.width) / this.zoom.scale
  }

  get vpBottom() {
    return (-this.origin.y + this.height) / this.zoom.scale
  }

  setDraggedItem(item: CanvasItem) {
    this.draggedItem = item
  }

  setHoveredItem(item: CanvasItem) {
    this.hoveredItem = item
  }

  setEditedItem(item: CanvasItem) {
    this.editedItem = item
  }

  setSelectedItem(item: CanvasItem) {
    this.selectedItem = item
  }

  async locateItem(item: CanvasItem) {
    let cx = this.width / 2
    let cy = this.height / 2
    await this.updateOrigin(-item.left + cx - 100, -item.top + cy - 100, async () => {
      this.highlightedItem = item
      await _sleep(600)
      this.highlightedItem = null
    })
  }

  isPointVisible(x: number, y: number) {
    return x > -this.origin.x && x < this.vpRight
      && y > -this.origin.y && y < this.vpBottom
  }

  setZoom(scale: number) {
    return new Tween(this.zoom)
      .to({ scale }, 500)
      .easing(Easing.Cubic.Out)
      .onComplete(() => {
      })
      .start()
  }

  zoomIn() {
    if (this.zoom.scale < this.zoom.max) this.setZoom(this.zoom.scale + this.zoom.delta)
  }

  zoomOut() {
    if (this.zoom.scale > this.zoom.min) this.setZoom(this.zoom.scale - this.zoom.delta)
  }

  clear() {
    // @ts-ignore
    let w = Math.max(parseInt(this.maxX), parseInt(this.width))
    // @ts-ignore
    let h = Math.max(parseInt(this.maxY), parseInt(this.height))
    this.ctx.clearRect(0, 0, w, h)
  }

  updateCanvasSize(w: number = null, h: number = null) {
    if (w) this.width = w
    if (h) this.height = h

    const dpr = window.devicePixelRatio

    this.element.width = this.width * dpr
    this.element.height = this.height * dpr

    this.ctx.scale(dpr, dpr)

    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
  }

  updateOrigin(x: number, y: number, onComplete: any = null) {
    if (!onComplete) {
      this.origin.x = x
      this.origin.y = y
      return
    }

    return new Tween(this.origin)
      .to({ x, y }, 500)
      .easing(Easing.Cubic.Out)
      .onComplete(onComplete)
      .start()

  }

  onDragEnd() {
  }
}
