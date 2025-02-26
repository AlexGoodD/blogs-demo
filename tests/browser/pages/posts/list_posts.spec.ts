import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { PostsList } from '#tests/browser/pages/posts/pages/PostsList'
import { UserFactory } from '#database/factories/user_factory'
import { PostFactory } from '#database/factories/post_factory'

test.group('Posts page', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('list posts', async ({ assert, browserContext, visit }) => {
    // Given
    const user = await UserFactory.create()
    const posts = await PostFactory.createMany(5)
    await browserContext.loginAs(user)
    const page = await visit(PostsList)
    await page.page.pause()
    // When∂
    // Then
  }).pin()
})
