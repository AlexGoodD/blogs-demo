import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator } from '#validators/posts'

export default class PostsController {
  public async index({ view }: HttpContext) {
    const posts = await Post.all()
    return view.render('pages/home', { posts })
  }
  public async create({ view }: HttpContext) {
    return view.render('pages/posts/create_post')
  }
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    await Post.create(payload)
    return response.redirect('/')
  }
  public async destroy({ request, response }: HttpContext) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)
    await post.delete()
    return response.redirect('/')
  }
}
