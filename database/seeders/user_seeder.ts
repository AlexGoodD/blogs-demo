import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'John Doe',
      email: 'assas@gmail.com',
      password: 'asdasd',
    })
  }
}
