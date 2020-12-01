import {
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectID } from 'mongodb'
import { Model } from 'mongoose'
import { DeleteWriteOpResultObject } from 'typeorm/driver/mongodb/typings'

import { CreateUserDto } from '~/api/user/dto/createUser.dto'
import { UpdateUserDto } from '~/api/user/dto/updateUser.dto'
import { UserDocument } from '~/schemas/user.schema'
import { IUser } from '~/types/user'

@Injectable()
export class UserRepository {
  private logger = new Logger('USER_REPOSITORY')

  constructor(@InjectModel('User') private Database: Model<UserDocument>) {}

  async createUser(createUserDTO: CreateUserDto): Promise<UserDocument> {
    const data: IUser = { ...createUserDTO, role: 'client' }

    const user = new this.Database(data)

    try {
      await user.save()
    } catch (error) {
      this.logger.error('Failed to create user data', error.stack)
      throw new InternalServerErrorException()
    }
    return user
  }

  async deleteUser(id: string): Promise<boolean> {
    const result: DeleteWriteOpResultObject = await this.Database.deleteOne({
      _id: new ObjectID(id)
    })

    if (result.deletedCount == 0) {
      return false
    }

    return true
  }

  async get(email: string): Promise<UserDocument> {
    return await this.Database.findOne({ email }).exec()
  }

  async checkEmailAlreadyInUse(email: string) {
    return this.Database.findOne({ email })
  }

  async updateUser(user: UpdateUserDto, id: string): Promise<UserDocument> {
    return await this.Database.updateOne(
      { id },
      {
        // @ts-ignore
        $push: {
          ...user
        }
      },
      { upsert: false }
    ).exec()
  }

  async updatePassword(email: string, password: string): Promise<any> {
    const user = await this.Database.findOne({ email }).exec()

    user.update({ password })
    return user
  }
}
