import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { createCommentValidator } from '#validators/comment'

export default class CommentsController {
  public async index({ view }: HttpContext) {
    const comments = await Comment.all()
    return view.render('pages/posts/view_post', { comments })
  }

  public async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createCommentValidator)
    const postId = request.input('postId')
    await Comment.create({ ...payload, userId: auth.user!.id, postId, userEmail: auth.user!.email })
    return response.redirect().back()
  }
}
