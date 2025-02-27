import { BasePage } from '@japa/browser-client'

export class SignupPage extends BasePage {
  url = '/signup'
  async fillForm(fullName: string, email: string, password: string) {
    await this.page.getByLabel('Fullname').fill(fullName)
    await this.page.getByLabel('Email').fill(email)
    await this.page.getByLabel('Password').fill(password)
  }
  async register() {
    await this.page.getByRole('button', { name: 'Submit' }).click()
  }
  async assertIsInSignupPage() {
    await this.page.assertUrlContains('/signup')
  }
}
