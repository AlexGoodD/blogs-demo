import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('posts', (table) => {
      table
        .string('user_email')
        .unsigned()
        .references('users.email')
        .onUpdate('CASCADE') // Agregar esta línea para actualizar en cascada
        .onDelete('CASCADE')
        .notNullable()
    })
  }
}
