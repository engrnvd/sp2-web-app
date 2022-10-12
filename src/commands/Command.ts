import { useCommandsStore } from '../stores/commands.store'

export class Command {
  description: string = 'Parent Command'
  payload: any = null
  commands: any = null

  constructor(payload: any) {
    this.payload = payload
    this.commands = useCommandsStore()
  }

  label() {
    return this.description
  }

  run() {
    this.commands.currentCommandIdx = this.commands.history.indexOf(this)
    this.commands.save()
  }

  saveToHistory() {
    this.commands.history.push(this)
  }

  execute() {
    this.saveToHistory()
    this.run()
  }

  redo() {
    this.run()
  }

  undo() {
    this.commands.currentCommandIdx--
    this.commands.saveUndo()
  }
}
