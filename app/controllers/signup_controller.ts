import { HttpContext } from '@adonisjs/core/http'
import { signupValidator } from '#validators/signup'
import User from '#models/user'

export default class SignupController {
  public async index({ view, auth, response }: HttpContext) {
    await auth.check()
    if (auth.user) {
      response.redirect('/')
    }
    return view.render('pages/signup')
  }

  public async store({ request, response, view, auth }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    const user = await User.create(payload)
    await auth.use('web').login(user)
    response.redirect('/')
  }
}
