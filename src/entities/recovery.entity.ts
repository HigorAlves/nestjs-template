import { Entity, Column, ObjectIdColumn } from 'typeorm'

import { BaseModel } from './models/base.model'

@Entity('recovery')
export class RecoveryEntity extends BaseModel<RecoveryEntity> {
  @Column({ name: 'email' })
  email: string

  @Column({ name: 'code' })
  code: string
}
