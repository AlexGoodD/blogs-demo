import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table
        .string('userEmail')
        .unsigned()
        .references('users.email')
        .onDelete('CASCADE')
        .notNullable()
      table.string('description')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
