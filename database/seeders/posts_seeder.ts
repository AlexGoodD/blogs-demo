import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Post from '#models/post'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const user = await User.create({
      fullName: 'John Doe',
      email: 'assas@gmail.com',
      password: 'asdasd',
    })
    await Post.createMany([
      {
        title: 'Hello world',
        description: 'This is a test post',
        userId: user.id,
      },
      {
        title: 'Hello world 2',
        description: 'This is a test post 2',
        userId: user.id,
      },
    ])
  }
}
