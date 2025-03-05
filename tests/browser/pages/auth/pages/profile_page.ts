import { BasePage } from '@japa/browser-client'

export class ProfilePage extends BasePage {
  url = '/profile'
  async fillForm(fullName: string, email: string, password: string) {
    await this.page.getByLabel('Full Name').fill(fullName)
    await this.page.getByLabel('Email').fill(email)
    await this.page.getByPlaceholder('Make a strong password!').fill(password)
  }
  async profile() {
    await this.page.getByRole('button', { name: 'Profile' }).click()
  }
  async edit() {
    await this.page.getByRole('button', { name: 'Edit' }).click()
  }
  async update() {
    await this.page.getByRole('button', { name: 'Update Info' }).click()
  }
  async verifyText(fullName: string, email: string, password: string) {
    await this.page.getByLabel('Full Name').fill(fullName)
    await this.page.getByLabel('Email').fill(email)
    await this.page.getByPlaceholder('Make a strong password!').fill(password)
  }
}
