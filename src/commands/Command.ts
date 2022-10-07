import { useCommandsStore } from '../stores/commands.store'

export class Command {
    description: string = 'Parent Command'
    payload: any = null
    commands = null

    constructor(payload) {
        this.payload = payload
        this.commands = useCommandsStore()
    }

    label() {
        return this.description
    }

    run() {
        this.commands.currentCommandIdx = this.commands.history.indexOf(this)
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
    }
}
