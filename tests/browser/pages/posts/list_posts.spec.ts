import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { PostsList } from '#tests/browser/pages/posts/pages/post_page'
import { UserFactory } from '#database/factories/user_factory'
import { PostFactory } from '#database/factories/post_factory'
import { count } from 'node:console'

test.group('Posts page', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('list posts', async ({ assert, browserContext, visit }) => {
    // Given
    const user = await UserFactory.create()
    const posts = await PostFactory.createMany(5)
    await browserContext.loginAs(user)
    const page = await visit(PostsList)
    await page.page.pause()
    // When
    // Then
  })

  test('delete posts', async ({ assert, browserContext, visit }) => {
    // Given
    const user = await UserFactory.create() //genera usuario 'random'
    const posts = await PostFactory.createMany(5) //genera 5 posts 'random'
    await browserContext.loginAs(user) //Loguea al usuario
    const page = await visit(PostsList) //Visita la página de posts
    // When
    await page.delete(0) //Elimina el post de la posición 0
    const postCount = await page.countPosts() //Cuenta el número de post
    // Then
    assert.equal(postCount, 4) //Verifica que el número de post sea 4
  })

  test('edit posts', async ({ assert, browserContext, visit }) => {
    //(Actualmente tiene que entrar al post para poder verificar el cambio, mejorar eso)
    // Given
    const user = await UserFactory.create() //genera usuario 'random'
    const posts = await PostFactory.createMany(5) //genera 5 posts 'random'
    await browserContext.loginAs(user) //Loguea al usuario
    const page = await visit(PostsList) //Visita la página de posts
    // When

    //Debe acceder al botón editar/read-more
    await page.read(0)
    //Acceder al campo de descripción/Modificar el campo de descripción
    await page.page.getByLabel('Description').fill('Hola')
    //Presionar el botón de create-post
    await page.editPost()

    // Then
    //Verificar que el post tal, haya cambiado y ahora sea esto otro
    await page.read(0)
    await page.page.assertTextContains('Description', '\n  Hola\n')
  }).pin()
})
