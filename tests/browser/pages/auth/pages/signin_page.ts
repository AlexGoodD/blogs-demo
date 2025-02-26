import { BasePage } from '@japa/browser-client'

export class SigninPage extends BasePage {
  url = '/signin'
  async fillForm(email: string, password: string) {
    await this.page.getByLabel('Your email').fill(email)
    await this.page.getByLabel('Your password').fill(password)
  }
  async login() {
    await this.page.getByRole('button', { name: 'Submit' }).click()
  }
  async assertIsInSigninPage() {
    await this.page.assertUrlContains('/signin')
  }
}
