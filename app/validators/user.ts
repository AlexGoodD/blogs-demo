import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6).maxLength(100),
    email: vine.string().trim().minLength(10),
    password: vine.string().trim().minLength(6).maxLength(100).optional(),
    avatar: vine.file({ extnames: ['svg', 'png', 'jpg', 'jpeg'], size: '5mb' }).optional(),
    avatarUrl: vine.string().optional(),
  })
)
