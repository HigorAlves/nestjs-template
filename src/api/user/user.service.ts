import { CreateUserDto } from '@/api/user/dto/createUser.dto';
import { UpdateUserDto } from '@/api/user/dto/updateUser.dto';
import { UserRepository } from '@/api/user/user.repository';
import { UserEntity } from '@/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseType } from '@/interfaces/response.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private logger: Logger = new Logger('USER_SERVICE');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(
    createUserDTO: CreateUserDto,
  ): Promise<UserEntity | ResponseType> {
    const alreadyInUse = await this.userRepository.checkEmailAlreadyInUse(
      createUserDTO.email,
    );

    if (alreadyInUse) {
      this.logger.error(`${createUserDTO.email} is alredy in use`);
      return {
        success: false,
        message: 'This email is already in use',
        error: false,
      };
    } else {
      createUserDTO.password = bcrypt.hashSync(createUserDTO.password, 10);
      return this.userRepository.createUser(createUserDTO);
    }
  }

  async delete(id: string): Promise<boolean> {
    return this.userRepository.deleteUser(id);
  }

  async get(email: string): Promise<UserEntity> {
    return this.userRepository.get(email);
  }

  async update(id: string, user: UpdateUserDto) {
    delete user.email;
    return this.userRepository.updateUser(user, id);
  }
}
