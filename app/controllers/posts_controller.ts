import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator } from '#validators/posts'
import Comment from '#models/comment'
import { Bouncer } from '@adonisjs/bouncer'
import User from '#models/user'

export const editPost = Bouncer.ability((user: User, post: Post) => {
  return user.id === post.userId
})

export default class PostsController {
  public async index({ view }: HttpContext) {
    const posts = await Post.all()
    return view.render('pages/home', { posts })
  }

  public async create({ inertia }: HttpContext) {
    console.log('Entered create')
    return inertia.render('create_post')
  }

  public async store({ request, inertia, auth }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    await Post.create({ ...payload, userId: auth.user!.id, userEmail: auth.user!.email })
    return inertia.location('/') // Redirección completa
  }

  public async destroy({ request, response }: HttpContext) {
    const postId = request.param('id')
    const post = await Post.findOrFail(postId)

    await Comment.query().where('postId', postId).delete()

    await post.delete()
    return response.redirect('/')
  }

  public async edit({ view, params, auth, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    // Si el usuario actual no es el dueño del post, e intenta acceder a la ruta de edición, redirigirlo a la vista del post
    // ¿Como se puede mejorar esto?/Protegerlo mejor, bouncer me redirecciona mucho verificar
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
    const post = await Post.query()
      .where('id', params.id)
      .preload('user')
      .preload('comments')
      .firstOrFail()
    // const comments = await Comment.query().exec()
    return view.render('pages/posts/view_post', { post })
  }
}
