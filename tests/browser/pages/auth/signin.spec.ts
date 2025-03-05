import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { SigninPage } from '#tests/browser/pages/auth/pages/signin_page'

test.group('Signin page', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('signs in', async ({ assert, visit }) => {
    // Given
    const page = await visit(SigninPage)
    const user = await User.create({
      email: 'axelqwqw@gmail.com',
      password: 'asdasd',
    })
    // When
    await page.fillForm(user.email, 'asdasd')
    await page.login()
    // Then
    //const url = page.page.url().replace('http://localhost:3333', '')
    //assert.equal(url, '/')
  })

  test('shows an error message when credentials are invalid', async ({ assert, visit }) => {
    // Given
    const page = await visit(SigninPage)
    // When
    await page.fillForm('jondoe@gmail.com', 'asdasd')
    await page.login()
    // Then
    await page.assertIsInSigninPage()
    await page.page.assertTextContains('body', 'Invalid credentials')
  })

  test('shows validations errors', async ({ assert, visit }) => {
    // Given
    const page = await visit(SigninPage)
    // When
    await page.login()
    // Then
    await page.assertIsInSigninPage()
    await page.page.assertTextContains('body', 'The email field must be defined')
    await page.page.assertTextContains('body', 'The password field must be defined')
  })
})
