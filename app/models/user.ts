import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, computed, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import Comment from './comment.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare avatarUrl: string | null

  @column()
  declare email: string

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @computed()
  get formattedCreatedAt(): string {
    return this.createdAt
      ? this.createdAt.setZone('America/Mexico_City').toFormat('yy/MM/dd, hh:mm a')
      : '' //Day, Month, Number, Year, Hour:Minute AM/PM
  }

  @computed()
  get formattedUpdatedAt(): string {
    return this.updatedAt
      ? this.updatedAt.setZone('America/Mexico_City').toFormat('yy/MM/dd, hh:mm a')
      : ''
  }
}
