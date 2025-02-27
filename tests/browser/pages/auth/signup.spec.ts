import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { SignupPage } from '#tests/browser/pages/auth/pages/signup_page'

test.group('Signup page', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('signs up', async ({ assert, visit }) => {
    // Given
    const page = await visit(SignupPage)
    // When
    await page.fillForm('testeo_nombre', 'testeo@email.com', 'DASDASDAS')
    await page.register()

    // Then
    //const url = page.page.url().replace('http://localhost:59444/', '')
    //assert.equal(url, '/')
  })

  test('shows an error message when missing inputs', async ({ assert, visit }) => {
    // Given
    const page = await visit(SignupPage)
    // When
    await page.fillForm('sas', '', 'password')
    await page.register()
    // Then
    await page.assertIsInSignupPage()
    await page.page.assertTextContains('body', 'The email field must be defined')
    // Si son varias alertas como las vuelvo un conjunto OR

    await page.page.pause()
  })

  test('shows validations errors', async ({ assert, visit }) => {
    // Given
    const page = await visit(SignupPage)
    // When
    await page.register()
    // Then
    await page.assertIsInSignupPage()
    await page.page.assertTextContains('body', 'The fullName field must be defined')
    await page.page.assertTextContains('body', 'The email field must be defined')
    await page.page.assertTextContains('body', 'The password field must be defined')
  }).pin()
})
