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

  get dragging() {
    return this.pressed && this.moving
  }

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
      if (e.shiftKey) {
        canvas.selection.toggle(canvas.hoveredItem)
        return
      }

      this.x = e.offsetX
      this.y = e.offsetY
      this.clicked = true
      this.pressed = false

      if (canvas.hoveredItem) {
        if (canvas.hoveredItem.selectable) canvas.setSelectedItem(canvas.hoveredItem)
      } else {
        canvas.setSelectedItem(null)
        canvas.setEditedItem(null)
      }
    })

    canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0) return // only left click plz

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
    })

    canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
      this.x = e.offsetX
      this.y = e.offsetY
      this.moving = true

      canvas.element.style.cursor = canvas.hoveredItem ? 'pointer' : 'initial'

      if (this.pressed) {
        if (canvas.hoveredItem) { // dragging an object
          if (!canvas.draggedItem) { // don't select a new object if already dragging
            if (canvas.hoveredItem?.draggable) canvas.setDraggedItem(canvas.hoveredItem)
          }
          // fix: dragging over the toolbar makes things go crazy
          canvas.setSelectedItem(null)
        } else { // dragging the canvas
          canvas.updateOrigin(this.dx + canvas.lastOrigin.x, this.dy + canvas.lastOrigin.y)
        }
      }
      e.preventDefault()
      e.stopPropagation()
    })

    canvas.element.addEventListener('mouseleave', (e: MouseEvent) => {
      canvas.onDragEnd()
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
