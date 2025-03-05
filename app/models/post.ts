import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, hasMany, computed } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare userId: number

  @column()
  declare userEmail: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

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
