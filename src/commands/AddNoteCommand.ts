import type { SitemapNote } from 'src/classes/SitemapNote'
import { Command } from './Command'

interface Payload {
  note: SitemapNote
}

export class AddNoteCommand extends Command {
  description = 'Add new note'
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  run() {
    const note = this.payload.note
    note.sitemap.notes.push(note)

    super.run()
  }

  undo() {
    const note = this.payload.note
    const notes = note.sitemap?.notes

    note.sitemap.notes.splice(notes.indexOf(note), 1)

    super.undo()
  }

}
