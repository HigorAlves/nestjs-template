import { Injectable, Logger } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '~/api/user/dto/createUser.dto'
import { UpdateUserDto } from '~/api/user/dto/updateUser.dto'
import { UserRepository } from '~/api/user/user.repository'
import { UserDocument } from '~/schemas/user.schema'
import { ResponseType } from '~/types/response'

@Injectable()
export class UserService {
  private logger: Logger = new Logger('USER_SERVICE')
  constructor(private userRepository: UserRepository) {}

  async create(
    createUserDTO: CreateUserDto
  ): Promise<ResponseType<UserDocument>> {
    const alreadyInUse = await this.userRepository.checkEmailAlreadyInUse(
      createUserDTO.email
    )

    if (alreadyInUse) {
      this.logger.error(`${createUserDTO.email} is alredy in use`)
      return {
        status: 400,
        message: 'This email is already in use',
        error: true
      }
    } else {
      createUserDTO.password = await bcrypt.hashSync(createUserDTO.password, 10)

      const result = await this.userRepository.createUser(createUserDTO)
      return {
        status: 201,
        message: 'User created successfully',
        error: false,
        ...result
      }
    }
  }

  async delete(id: string): Promise<boolean> {
    return this.userRepository.deleteUser(id)
  }

  // @ts-ignore
  async getByEmail(email: string): any {
    return this.userRepository.get(email)
  }

  async update(id: string, user: UpdateUserDto) {
    delete user.email
    return this.userRepository.updateUser(user, id)
  }

  async updatePassword(email: string, password: string): Promise<UserDocument> {
    const passwordHash = bcrypt.hashSync(password, 10)
    return this.userRepository.updatePassword(email, passwordHash)
  }
}
