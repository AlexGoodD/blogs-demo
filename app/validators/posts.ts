import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6).maxLength(100),
    description: vine.string().trim().minLength(50).maxLength(200).escape(),
  })
)
