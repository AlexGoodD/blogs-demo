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

  public async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    await Post.create({ ...payload, userId: auth.user!.id })
    return response.redirect('/')
  }

  public async destroy({ request, response }: HttpContext) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)
    await post.delete()
    return response.redirect('/')
  }

  public async edit({ view, params, auth, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    // Si el usuario actual no es el dueño del post, e intenta acceder a la ruta de edición, redirigirlo a la vista del post
    // ¿Como se puede mejorar esto?/Protegerlo mejor
    if (post.userId !== auth.user!.id) {
      return response.redirect(`/posts/${post.id}/view`)
    }
    return view.render('pages/posts/edit_post', { post })
  }

  public async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    const post = await Post.findOrFail(params.id)
    post.merge(payload)
    await post.save()
    return response.redirect('/')
  }

  public async view({ view, params }: HttpContext) {
    const post = await Post.query().where('id', params.id).preload('user').firstOrFail()
    return view.render('pages/posts/view_post', { post })
  }
}
