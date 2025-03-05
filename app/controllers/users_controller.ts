import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'
import app from '@adonisjs/core/services/app'
import { errorMessages } from 'vue/compiler-sfc'

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

  public async update({ request, response, params, auth, view }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const { fullName, email, avatar, password } = payload
    const user = await User.findOrFail(params.id)

    try {
      if (!password) {
        delete payload.password
      }

      if (avatar) {
        await avatar.move(app.makePath('storage/avatars'))
        auth.user!.avatarUrl = `/avatars/${avatar.fileName}`
      }

      await auth.user!.merge({ fullName, email, password }).save()

      return response.redirect('/profile/')
    } catch (error) {
      if (error.code === '23505') {
        console.log('Email already exists')
        return view.render('pages/user/editProfile', { user, errorMessage: 'Email already exists' })
      }
      return view.render('pages/user/editProfile', { user })
    }
  }
}
