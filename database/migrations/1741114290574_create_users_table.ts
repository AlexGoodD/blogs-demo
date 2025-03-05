import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RenameAvatarToAvatarUrl extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.renameColumn('avatar', 'avatarUrl')
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.renameColumn('avatarUrl', 'avatar')
    })
  }
}
