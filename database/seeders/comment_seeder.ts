import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Comment from '#models/comment'
import User from '#models/user'
import Post from '#models/post'

export default class extends BaseSeeder {
  async run() {
    const user = await User.create({
      fullName: 'John Doe',
      email: 'FINAL??@gmail.com',
      password: 'asdasd',
    })

    const posts = await Post.createMany([
      {
        title: 'Hello world',
        userId: user.id,
        description: 'This is a test post',
      },
    ])

    await Comment.createMany([
      {
        userId: user.id,
        comment: 'This is a test comment for post 1',
        postId: posts[0].id,
      },
    ])
  }
}
