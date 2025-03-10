import { HttpContext } from '@adonisjs/core/http'
import { signinValidator } from '#validators/signin'
import User from '#models/user'

export default class SigninController {
  public async index({ view, auth, response }: HttpContext) {
    await auth.check()
    if (auth.user) {
      response.redirect('/')
    }
    return view.render('pages/signin')
  }

  public async store({ request, response, session, auth }: HttpContext) {
    const payload = await request.validateUsing(signinValidator)
    try {
      const user = await User.verifyCredentials(payload.email, payload.password)
      await auth.use('web').login(user)
      response.redirect('/')
    } catch (e) {
      session.flash('error', 'Invalid credentials')
      response.redirect().back()
    }
  }
}
