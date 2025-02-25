import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Post from '#models/post'

export default class extends BaseSeeder {
  async run() {
    await Post.createMany([
      {
        title: 'Hello world',
        description: 'This is a test post',
      },
      {
        title: 'Hello world 2',
        description: 'This is a test post 2',
      },
    ])
  }
}
