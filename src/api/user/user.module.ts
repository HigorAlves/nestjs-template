import { UserRepository } from '@/api/user/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from 'src/api/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
