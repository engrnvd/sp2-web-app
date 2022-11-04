import type { CanvasItem } from 'src/classes/canvas/CanvasItem'
import { DeleteItemCommand } from 'src/commands/DeleteItemCommand'
import { Command } from './Command'

interface Payload {
  items: CanvasItem[] | Set<CanvasItem>,
}

export class DeleteMultipleItemsCommand extends Command {
  description = ''
  declare payload: Payload
  _commands: DeleteItemCommand[] = []

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
    this.payload.items.forEach(item => this._commands.push(new DeleteItemCommand({ item: item.meta })))
  }

  label(): string {
    // @ts-ignore
    return `Delete ${this.payload.items.size || this.payload.items.length} items`
  }

  run() {
    this._commands.forEach(c => c.run(false))

    super.run()
  }

  undo() {
    this._commands.forEach(c => c.undo(false))

    super.undo()
  }
}
