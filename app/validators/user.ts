import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6).maxLength(100),
    email: vine.string().email().trim().minLength(6),
    password: vine.string().trim().escape(),
    //cpassword: vine.string().trim().escape().sameAs('password'), //Ocupo incluirla en el modelo
  })
)
