import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import app from '@adonisjs/core/services/app'
import { editProfile } from '#abilities/main'

export default class UsersController {
  public async view({ view }: HttpContext) {
    const user = await User.all()
    return view.render('pages/user/profile', { user })
  }

  public async edit({ view, params, response, bouncer }: HttpContext) {
    const user = await User.findOrFail(params.id)

    if (await bouncer.denies(editProfile, user)) {
      return response.redirect(`/profile/`)
    }
    return view.render('pages/user/editProfile', { user })
  }

  public async update({ request, response, params, auth, view }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)
    const { fullName, email, avatar } = payload
    const user = await User.findOrFail(params.id)

    try {
      if (avatar) {
        await avatar.move(app.makePath('storage/avatars'))
        auth.user!.avatarUrl = `/avatars/${avatar.fileName}`
      }

      await auth.user!.merge({ fullName, email }).save()

      return response.redirect('/profile/')
    } catch (error) {
      // ¿Como puedo lograr que detecte error de email duplicado? + editProfile.edge
      if (error.code === '23505') {
        return view.render('pages/user/editProfile', { user, errorMessage: 'Email already exists' })
      }
      return view.render('pages/user/editProfile', { user })
    }
  }
}
