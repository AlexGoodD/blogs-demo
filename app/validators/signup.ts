import vine from '@vinejs/vine'

export const signupValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().maxLength(150),
    email: vine.string().email().trim().minLength(6),
    password: vine.string().trim().escape(),
  })
)
