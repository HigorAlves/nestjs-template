import { CreateUserDto } from '@/api/user/dto/createUser.dto';
import { UpdateUserDto } from '@/api/user/dto/updateUser.dto';
import { UserEntity } from '@/entities/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import {
  EntityRepository,
  getMongoRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { DeleteWriteOpResultObject } from 'typeorm/driver/mongodb/typings';
import { ObjectID } from 'mongodb';
import { IUser } from '@/types/user';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  private logger = new Logger('USER_REPOSITORY');

  async createUser(createUserDTO: CreateUserDto): Promise<UserEntity> {
    const data: IUser = { ...createUserDTO, role: 'client' };
    const user = new UserEntity(data);

    try {
      await user.save();
    } catch (error) {
      this.logger.error('Failed to create user data', error.stack);
      throw new InternalServerErrorException();
    }
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const manager = getMongoRepository(UserEntity);
    const result: DeleteWriteOpResultObject = await manager.deleteOne({
      _id: new ObjectID(id),
    });

    if (result.deletedCount == 0) {
      return false;
    }

    return true;
  }

  async get(email: string): Promise<UserEntity> {
    const manager = getMongoRepository(UserEntity);
    return await manager.findOne({ where: { email } });
  }

  async checkEmailAlreadyInUse(email: string) {
    const database = getMongoRepository(UserEntity);
    return database.findOne({ where: { email } });
  }

  async updateUser(user: UpdateUserDto, id: string): Promise<UpdateResult> {
    const database = getMongoRepository(UserEntity);
    const data = new UserEntity(user);
    return await database.update(id, data);
  }
}
