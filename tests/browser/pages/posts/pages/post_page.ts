import { BasePage } from '@japa/browser-client'

export class PostsList extends BasePage {
  url = '/'

  //Eliminar en base a posición de Post
  async delete(position: number) {
    const deleteButtons = await this.page.getByRole('button', { name: 'Delete' })
    await deleteButtons.nth(position).click()
  }

  //Contar número de posts
  async countPosts() {
    const posts = await this.page.locator('div.grid > form') // Selecciona todos los formularios dentro de la cuadrícula
    return await posts.count()
  }

  //Acceder a read-more
  async edit(position: number) {
    const editButtons = await this.page.getByRole('button', { name: 'Read more' })
    await editButtons.nth(position).click()
  }
}
