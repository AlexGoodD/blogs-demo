import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RenameAvatarUrlColumn extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('avatarUrl', 'avatar_url')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('avatar_url', 'avatarUrl')
    })
  }
}
