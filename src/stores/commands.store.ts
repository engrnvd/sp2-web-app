import { defineStore } from 'pinia'

export const useCommandsStore = defineStore('commands', {
  state: () => ({
    history: [],
    currentCommandIdx: -1,
  }),
  getters: {
    currentCommand() {
      return this.history[this.currentCommandIdx]
    },
    nextCommand() {
      return this.history[this.currentCommandIdx + 1]
    },
    canUndo() {
      return this.currentCommandIdx >= 0
    },
    canRedo() {
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
  },
})
