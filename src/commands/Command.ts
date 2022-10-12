import type { Sitemap, SitemapCommand } from 'src/classes/Sitemap'
import { useAppStore } from 'src/stores/app.store'
import { useCommandsStore } from '../stores/commands.store'

export class Command {
  description: string = 'Parent Command'
  payload: any = null
  commands: any = null
  // @ts-ignore
  sitemap: Sitemap = null

  constructor(payload: any) {
    this.payload = payload
    this.commands = useCommandsStore()
    const app = useAppStore()
    // @ts-ignore
    this.sitemap = app.sitemap
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
    this.commands.save()
  }

  redo() {
    this.run()
  }

  undo() {
    this.commands.currentCommandIdx--
    this.commands.saveUndo()
  }

  toData(): SitemapCommand {
    let payload = {}
    for (const key in this.payload) {
      // @ts-ignore
      payload[key] = this.payload[key].toData ? this.payload[key].toData() : this.payload[key]
    }

    return {
      label: this.label(),
      type: this.constructor.name,
      payload,
    }
  }
}
