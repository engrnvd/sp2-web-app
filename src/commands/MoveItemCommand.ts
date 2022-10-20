import type { SitemapNote } from 'src/classes/SitemapNote'
import { Command } from './Command'

type MovableItem = SitemapNote

interface Payload {
  item: MovableItem,
  dx: number,
  dy: number,
}

export class MoveItemCommand extends Command {
  description = ''
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  label(): string {
    return `Move ${this.payload.item._type}`
  }

  run() {
    const { item, dx, dy } = this.payload
    item.left += dx
    item.top += dy

    super.run()
  }

  undo() {
    const { item, dx, dy } = this.payload
    item.left -= dx
    item.top -= dy

    super.undo()
  }
}
