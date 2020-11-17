import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class BaseModel<T> extends BaseEntity {
  constructor(entity?: Partial<T>) {
    super()
    Object.assign(this, entity || {})
  }

  @ObjectIdColumn({ name: '_id' })
  id: string

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date

  @Column('boolean', { name: 'inactive', default: false })
  inactive: boolean
}
