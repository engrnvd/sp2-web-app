import { defineStore } from 'pinia'
import type { Command } from 'src/commands/Command'
import { FetchRequest } from 'src/helpers/fetch-request'
import { useAppStore } from 'src/stores/app.store'
import { useAuthStore } from 'src/stores/auth.store'

export const useCommandsStore = defineStore('commands', {
  state: () => ({
    history: [],
    currentCommandIdx: -1,
    req: new FetchRequest('', 'POST'),
  }),
  getters: {
    currentCommand(): Command {
      return this.history[this.currentCommandIdx]
    },
    nextCommand(): Command {
      return this.history[this.currentCommandIdx + 1]
    },
    canUndo(): boolean {
      return this.currentCommandIdx >= 0
    },
    canRedo(): boolean {
      return this.history.length > 0 && this.currentCommandIdx < this.history.length - 1
    },
  },
  actions: {
    undo() {
      if (this.canUndo) this.currentCommand.undo()
    },
    redo() {
      if (this.canRedo) {
        if (!this.nextCommand) console.log('Error: cant redo')
        this.nextCommand.redo()
      }
    },
    save(undo = false) {
      let app = useAppStore()
      const auth = useAuthStore()
      if (!app.sitemap || !auth.isLoggedIn) return

      this.req.url = `sitemaps/${app.sitemap.id}/commands/`
      this.req.url += undo ? 'undo' : 'save'
      let command = undo ? this.nextCommand : this.currentCommand
      this.req.send({
        body: JSON.stringify({
          label: command.label(),
          payload: app.sitemap.toData()
        })
      })
    },
    saveUndo() {
      return this.save(true)
    },
  },
})
