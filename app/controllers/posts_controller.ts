import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Post from '#models/post'
import { createPostValidator } from '#validators/posts'
import Comment from '#models/comment'
import { createCommentValidator } from '#validators/comment'

export default class PostsController {
  public async index({ request, view }: HttpContext) {
    const posts = await Post.all()
    return view.render('pages/home', { posts })
    /*Paginacion lógica
    const page = request.input('page', 2)
    const limit = 6
    const posts = await db.from('posts').select('*').paginate(page, limit)
    return view.render('pages/home', { posts })
    */
  }

  public async create({ view }: HttpContext) {
    return view.render('pages/posts/create_post')
  }

  public async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    const userEmail = request.input('userEmail')
    await Post.create({ ...payload, userId: auth.user!.id, userEmail })
    return response.redirect('/')
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
    const post = await Post.query()
      .where('id', params.id)
      .preload('user')
      .preload('comments')
      .firstOrFail()
    // const comments = await Comment.query().exec()
    return view.render('pages/posts/view_post', { post })
  }
}
