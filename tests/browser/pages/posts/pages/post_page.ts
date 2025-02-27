import { BasePage } from '@japa/browser-client'

export class PostsList extends BasePage {
  url = '/'

  //Eliminar en base a posición de Post
  async delete(position: number) {
    const deleteButtons = await this.page.getByRole('button', { name: 'Delete' })
    await deleteButtons.nth(position).click()
  }

  //Presionar botón leer más
  async read(position: number) {
    const readButtons = await this.page.getByRole('button', { name: 'Read' })
    await readButtons.nth(position).click()
  }

  async editPost() {
    await this.page.getByRole('button', { name: 'Create post' }).click()
  }

  //Contar número de posts
  async countPosts() {
    const posts = await this.page.locator('div.grid > form') // Selecciona todos los formularios dentro de la cuadrícula
    return await posts.count()
  }
}
