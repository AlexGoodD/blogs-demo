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

  public async edit({ params, response, bouncer }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    if (await bouncer.allows(editPost, post)) {
      return response.redirect(`/posts/${post.id}/edit`)
    }
    return response.redirect(`/posts/${post.id}/view`)
  }

  public async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(createPostValidator)
    const post = await Post.findOrFail(params.id)
    post.merge(payload)
    await post.save()
    return response.redirect('/')
  }

  public async view({ view, params }: HttpContext) {
    console.log('Entered view')
    const post = await Post.query()
      .where('id', params.id)
      .preload('user')
      .preload('comments')
      .firstOrFail()
    // const comments = await Comment.query().exec()
    return view.render('pages/posts/view_post', { post })
  }
}
