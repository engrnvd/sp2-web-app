import type { ApmCanvas } from './ApmCanvas'

export class Mouse {
  x = 0
  y = 0
  // @ts-ignore
  lastX: number
  // @ts-ignore
  lastY: number
  clicked = false
  pressed = false
  moving = false
  mouseUp = false

  get dx() {
    return this.x - this.lastX
  }

  get dy() {
    return this.y - this.lastY
  }

  initialize(canvas: ApmCanvas) {
    canvas.element.addEventListener('dblclick', (e: MouseEvent) => {
      if (canvas.hoveredItem) {
        if (canvas.hoveredItem?.editable) canvas.setEditedItem(canvas.hoveredItem)
      }
      e.stopPropagation()
      e.preventDefault()
    })

    canvas.element.addEventListener('click', (e: MouseEvent) => {
      this.x = e.offsetX
      this.y = e.offsetY
      this.clicked = true
      this.pressed = false

      if (!canvas.hoveredItem?.selectable) { // no hovered / selectable item; so reset
        canvas.resetSelection()
        return
      }

      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        canvas.handleMultipleSelection()
        return
      }

      // select single item
      canvas.setSelectedItem(canvas.hoveredItem)
      canvas.selection.clear()
    })

    canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return // only left click plz

      canvas.updateCursor()

      this.lastX = e.offsetX
      this.lastY = e.offsetY
      this.pressed = true

      canvas.lastOrigin.x = canvas.origin.x
      canvas.lastOrigin.y = canvas.origin.y
    })

    canvas.element.addEventListener('mouseup', (e: MouseEvent) => {
      this.pressed = false
      this.mouseUp = true
      canvas.onDragEnd()
      canvas.updateCursor()
    })

    canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      this.x = e.offsetX
      this.y = e.offsetY
      this.moving = true

      canvas.updateCursor()

      if (!this.pressed) return
      // mouse is pressed. Let's move things:

      // dragging the canvas
      if (!canvas.hoveredItem?.draggable && !canvas.draggedItem) {
        canvas.updateOrigin(this.dx + canvas.lastOrigin.x, this.dy + canvas.lastOrigin.y)
        return
      }

      // dragging an object

      // don't drag a new object if already dragging
      if (canvas.draggedItem) return

      // if the current item is not draggable, return
      if (!canvas.hoveredItem?.draggable) return

      // okay, drag now
      canvas.setDraggedItem(canvas.hoveredItem)

      // fix: dragging over the toolbar makes things go crazy
      canvas.setSelectedItem(null)
    })

    canvas.element.addEventListener('wheel', (e: WheelEvent) => {
      if (!e.metaKey && !e.ctrlKey) {
        let x = canvas.origin.x - Math.round(e.deltaX * 0.25)
        let y = canvas.origin.y - Math.round(e.deltaY * 0.35)
        canvas.updateOrigin(x, y)
        return false
      }

      if (e.deltaY < 0) canvas.zoomIn()
      else canvas.zoomOut()
      return false
    }, { passive: true })
  }
}
