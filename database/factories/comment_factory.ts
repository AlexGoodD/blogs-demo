import factory from '@adonisjs/lucid/factories'
import Comment from '#models/comment'
import Post from '#models/post'
import User from '#models/user'

export const CommentFactory = factory
  .define(Comment, async ({ faker }) => {
    const user = await User.firstOrFail()
    const post = await Post.firstOrFail()
    return {
      comment: faker.lorem.paragraphs(1),
      userId: user.id,
      userEmail: user.email,
      postId: post.id,
    }
  })
  .build()
