import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, computed } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Post from '#models/post'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare comment: string

  @column()
  declare userId: number

  @column()
  declare userEmail: string

  @column()
  declare postId: number

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Post, { foreignKey: 'postId' })
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
