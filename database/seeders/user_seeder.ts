import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'John Doe',
      email: 'axel@gmail.com',
      password: 'asdasd',
    })
  }
}
