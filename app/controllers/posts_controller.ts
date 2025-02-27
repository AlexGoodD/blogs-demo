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

  public async edit({ view, params }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    return view.render('pages/posts/edit_post', { post })
  }

  public async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    const post = await Post.findOrFail(params.id)
    post.merge(payload)
    await post.save()
    return response.redirect('/')
  }

  public async view({ view, request, params }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    return view.render('pages/posts/view_post', { post })
  }
}
