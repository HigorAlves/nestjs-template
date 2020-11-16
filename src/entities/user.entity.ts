import { Entity, Column } from 'typeorm'

import { BaseModel } from './models/base.model'
import { IUser } from '~/types/user'

@Entity('users')
export class UserEntity extends BaseModel<UserEntity> implements IUser {
  @Column({ name: 'firstName' })
  firstName: string

  @Column({ name: 'lastName' })
  lastName: string

  @Column({ name: 'birthday' })
  birthday: { day: number; month: number; year: number }

  @Column({ name: 'email' })
  email: string

  @Column({ name: 'password' })
  password: string

  @Column({ name: 'gender' })
  gender: boolean

  @Column({ name: 'image' })
  image: string

  @Column({ name: 'locale' })
  locale: { currency: 'BRL' | 'USD'; language: 'Portuguese' | 'English' }

  @Column({ name: 'role' })
  role: 'admin' | 'client'

  @Column({ name: 'balance', default: 0 })
  balance: number

  @Column({ name: 'affiliated' })
  affiliated: { from: string; valueToRescue: number }
}
