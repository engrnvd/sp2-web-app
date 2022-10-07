import { EditItemPropCommand } from './EditItemPropCommand'

export class EditItemNameCommand extends EditItemPropCommand {
  description = 'Edit item name'

  constructor(payload) {
    super({ ...payload, prop: 'name' })
  }
}
