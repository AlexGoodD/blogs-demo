import { BasePage } from '@japa/browser-client'

export class CommentsList extends BasePage {
  url = '/'
  async read(position: number) {
    const readButtons = await this.page.getByRole('button', { name: 'Read' })
    await readButtons.nth(position).click()
  }

  //Contar número de comentarios
  async countComments() {
    const comments = await this.page.locator('dl > div.flex.flex-col.pb-3') // Selecciona todos los formularios dentro de la cuadrícula
    return await comments.count()
  }
}
