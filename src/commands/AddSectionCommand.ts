import type { SitemapSection } from 'src/classes/SitemapSection'
import { Command } from './Command'

interface Payload {
  section: SitemapSection,
  index?: number,
}

export class AddSectionCommand extends Command {
  description = 'Add new section'
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  run() {
    const section = this.payload.section
    const sections = section.sitemap?.sections
    const index: number = this.payload.index || sections.length
    if (!sections) {
      console.log('Error: cant add section: ', section)
      return
    }

    sections.splice(index, 0, section)

    super.run()
  }

  undo() {
    const section = this.payload.section

    let sections = section.sitemap?.sections
    if (!sections) {
      console.log('Error: cant undo add section: ', section)
      return
    }

    sections.splice(sections.indexOf(section), 1)

    super.undo()
  }
}
