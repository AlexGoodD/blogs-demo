import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator } from '#validators/posts'
import { editPost } from '#abilities/main'

export default class PostsController {
  public async index({ view }: HttpContext) {
    const posts = await Post.query().preload('user')
    return view.render('pages/home', { posts })
  }

  public async create({ inertia }: HttpContext) {
    return inertia.render('create_post')
  }

  //Se puede acceder a datos del usuario con un preload ej. post.user.email
  public async store({ request, inertia, auth }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    await Post.create({ ...payload, userId: auth.user!.id })
    return inertia.location('/') // Redirección completa
  }

  public async destroy({ request, response }: HttpContext) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)
    //await Comment.query().where('postId', postId).delete()
    await post.delete()
    return response.redirect('/')
  }

  public async edit({ view, params, response, bouncer }: HttpContext) {
    const post = await Post.query().where('id', params.id).preload('user').firstOrFail()

    if (await bouncer.denies(editPost, post)) {
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
    const post = await Post.query()
      .where('id', params.id)
      .preload('user')
      .preload('comments', (query) => {
        query.preload('user', (userQuery) => {
          userQuery.select('id', 'email') // Asegura que se carga el email del usuario
        })
      })
      .firstOrFail()
    return view.render('pages/posts/view_post', { post })
  }
}
