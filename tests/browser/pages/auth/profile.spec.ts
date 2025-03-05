import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { ProfilePage } from './pages/profile_page.js'
import { UserFactory } from '#database/factories/user_factory'

test.group('Profile page', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('update info', async ({ assert, visit, browserContext }) => {
    //Given
    // Crea un usuario, lo loguea y visita la página de perfil
    const user = await UserFactory.create()
    await browserContext.loginAs(user)
    const page = await visit(ProfilePage)
    // When
    // Llena el formulario de edición, actualiza la información
    await page.edit()
    await page.fillForm('Testeo de update info', 'Updateinfos@gmail.com', 'testing')
    await page.update()
    await page.page.pause()
    // Then
    // Verifica que la información se haya actualizado correctamente en cada uno de los campos
    await page.edit()
    await page.verifyText('Testeo de update info', 'Updateinfo@gmail.com', 'testing')
  })
  test('shows an error with the new info dont pass', async ({ assert, visit, browserContext }) => {
    //Given
    // Crea un usuario, lo loguea y visita la página de perfil
    const user = await UserFactory.create()
    await browserContext.loginAs(user)
    const page = await visit(ProfilePage)
    // When
    // Llena el formulario de edición, actualiza la información
    await page.edit()
    await page.fillForm('', '', 'a')
    await page.update()
    // Then
    // Verifica que los mensajes aparezcan en pantalla
    await page.page.assertTextContains('body', 'The fullName field must be defined')
    await page.page.assertTextContains('body', 'The email field must be defined')
    await page.page.assertTextContains('body', 'The email field must be defined')
    await page.page.assertTextContains('body', 'The password field must have at least 6 characters')
  })
})
