import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { PostFactory } from '#database/factories/post_factory'
import { CommentFactory } from '#database/factories/comment_factory'
import { CommentsList } from './pages/list_comments.js'

test.group('Comments page', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('creation comment', async ({ assert, browserContext, visit }) => {
    //Given
    const user = await UserFactory.create()
    const post = await PostFactory.merge({ userId: user.id, userEmail: user.email }).create()
    const comment = await CommentFactory.merge({
      userId: user.id,
      userEmail: user.email,
      postId: post.id,
    }).createMany(3) //Le indico que genere comentarios con el usuario/email creado, y en el post creado
    await browserContext.loginAs(user)
    const page = await visit(CommentsList)
    //When
    await page.read(0)
    const commentCount = await page.countComments() //Cuenta el número de comentarios
    //Then
    assert.equal(commentCount, 3) //Verifica que el número de comentarios sea (1)
    await page.page.pause()
  })
})
