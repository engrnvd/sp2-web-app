import type { SitemapSection } from 'src/classes/SitemapSection'
import { Command } from './Command'

interface Payload {
  section: SitemapSection,
  fromIndex: number,
  toIndex: number,
}

export class MoveSectionCommand extends Command {
  description = 'Add new section'
  declare payload: Payload

  constructor(payload: Payload) {
    super(payload)
    this.payload = payload
  }

  run() {
    const { section, fromIndex, toIndex } = this.payload
    const sections = section.sitemap?.sections

    sections.splice(fromIndex, 1)
    sections.splice(toIndex, 0, section)

    super.run()
  }

  undo() {
    const { section, fromIndex, toIndex } = this.payload
    const sections = section.sitemap?.sections

    sections.splice(toIndex, 1)
    sections.splice(fromIndex, 0, section)

    super.undo()
  }
}
