import { BaseModel, column, belongsTo, computed } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Post from '#models/post'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare comment: string

  @column()
  declare userId: number

  @column()
  declare postId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

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
