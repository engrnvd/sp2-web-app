import type { SitemapBlock } from 'src/classes/SitemapBlock'
import type { SitemapPage } from 'src/classes/SitemapPage'
import type { SitemapSection } from 'src/classes/SitemapSection'
import { EditItemPropCommand } from './EditItemPropCommand'

interface Payload {
  item: SitemapPage | SitemapBlock | SitemapSection,
  value: any,
}

export class EditItemNameCommand extends EditItemPropCommand {
  constructor(payload: Payload) {
    super({ ...payload, prop: 'name' })
  }
}
