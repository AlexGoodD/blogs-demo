import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import User from '#models/user'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    const user = await User.firstOrFail() // Ensure there is at least one user in the database
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraphs(1),
      userId: user.id, // Set the user_id
    }
  })
  .build()
