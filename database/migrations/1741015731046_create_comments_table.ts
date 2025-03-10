import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('comment')
      table.string('user_email')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.integer('post_id').unsigned().references('posts.id').onDelete('CASCADE').notNullable() //Al eliminar post se eliminan todos los comentarios
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
