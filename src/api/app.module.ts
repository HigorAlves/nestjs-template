import { typeormConfig } from '@/config/typeorm.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/api/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UserModule],
})
export class AppModule {}
