import { test } from '@japa/runner'
import { PostsList } from '#tests/browser/pages/posts/pages/post_page'
import { UserFactory } from '#database/factories/user_factory'
import { PostFactory } from '#database/factories/post_factory'
import testUtils from '@adonisjs/core/services/test_utils'

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet ligula sit amet turpis convallis, eget malesuada purus molestie. Donec id eros ac justo egestas egestas. '

test.group('Posts page', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('creation posts', async ({ assert, browserContext, visit }) => {
    // Given
    const user = await UserFactory.create()
    const posts = await PostFactory.createMany(4)
    await browserContext.loginAs(user)
    const page = await visit(PostsList)
    // When
    const postCount = await page.countPosts() //Cuenta el número de post
    // Then
    assert.equal(postCount, 4) //Verifica que el número de post sea 4
  })

  test('delete posts', async ({ assert, browserContext, visit }) => {
    // Given
    const user = await UserFactory.create() //genera usuario 'random'
    const posts = await PostFactory.merge({ userId: user.id }).createMany(3) //genera 5 posts 'random'
    await browserContext.loginAs(user) //Loguea al usuario
    const page = await visit(PostsList) //Visita la página de posts
    // When
    await page.delete(0) //Elimina el post de la posición 0
    const postCount = await page.countPosts() //Cuenta el número de post
    // Then
    assert.equal(postCount, 2) //Verifica que el número de post sea 4
  })
  test('edit posts', async ({ browserContext, visit }) => {
    //(Actualmente tiene que entrar al post para poder verificar el cambio, mejorar eso)
    // Given
    const user = await UserFactory.create() //genera usuario 'random'
    const posts = await PostFactory.merge({ userId: user.id }).createMany(1) //genera 1 post 'random' asociando el userId al del usuario creado
    await browserContext.loginAs(user) //Loguea al usuario
    const page = await visit(PostsList) //Visita la página de posts
    await page.page.pause()
    // When
    //Debe acceder al botón editar/read-more
    await page.read(0)
    //Presionar el botón de edit-post
    await page.editPost()

    //Acceder al campo de descripción/Modificar el campo de descripción
    await page.page.getByLabel('Description').fill(text)
    //Presionar el botón de create-post (para guardar los cambios)
    await page.updatePost()
    // Then
    //Verificar que el post tal, haya cambiado y ahora sea esto otro
    await page.read(0)
    await page.editPost()
    await page.page.assertTextContains('Post Description', text)
  })
})
