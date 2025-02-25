import vine from '@vinejs/vine'

export const signinValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().minLength(6),
    password: vine.string().trim().escape(),
  })
)
