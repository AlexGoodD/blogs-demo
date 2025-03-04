import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'

export default class UsersController {
  public async view({ view }: HttpContext) {
    const user = await User.all()
    return view.render('pages/user/profile', { user })
  }

  public async edit({ view, params, auth, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    // Si el usuario actual no es el dueño del post, e intenta acceder a la ruta de edición, redirigirlo a la vista del post
    // ¿Como se puede mejorar esto?/Protegerlo mejor, bouncer me redirecciona mucho verificar
    if (user.id !== auth.user!.id) {
      return response.redirect(`/profile/`)
    }
    return view.render('pages/user/editProfile', { user })
  }

  public async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await User.findOrFail(params.id)
    user.merge(payload)
    await user.save()
    return response.redirect('/')
  }
}
