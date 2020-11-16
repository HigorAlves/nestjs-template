import { Logger } from '@nestjs/common'
import { EntityRepository, getMongoRepository, Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { RecoveryEntity } from '~/entities/recovery.entity'

@EntityRepository(RecoveryEntity)
export class AuthRepository extends Repository<RecoveryEntity> {
  private logger = new Logger('AUTH_REPOSITORY')

  async createTTL() {
    const database = getMongoRepository(RecoveryEntity)
    try {
      await database.createCollectionIndex('created_at', {
        expireAfterSeconds: 1
      })
    } catch (error) {
      this.logger.warn(
        'The TTL database already exists, we are just ignoring this issue'
      )
    }
  }

  async alreadyGenerated(email: string): Promise<RecoveryEntity> {
    const database = getMongoRepository(RecoveryEntity)
    return await database.findOne({ where: { email } })
  }

  async createRecoveryCode(email: string): Promise<boolean> {
    const code: string = uuid()

    const recovery = new RecoveryEntity({ email, code })
    recovery.save()
    return true
  }
}
