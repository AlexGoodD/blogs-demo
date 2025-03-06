import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('comments', (table) => {
      table.dropColumn('user_email')
    })
  }
}
