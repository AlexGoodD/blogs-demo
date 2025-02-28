import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Comment from '#models/comment'
import User from '#models/user'
import Post from '#models/post'

export default class extends BaseSeeder {
  async run() {
    // Fetch existing user and post
    const user = await User.findByOrFail('email', 'FINAL??@gmail.com')
    const post = await Post.findByOrFail('title', 'Hello world')

    await Comment.createMany([
      {
        userId: user.id,
        comment: 'This is a test comment for post 1',
        postId: post.id,
      },
    ])
  }
}
