import { IUser } from '@/interfaces/user.interface';
import { Entity, Column } from 'typeorm';
import { BaseModel } from './models/base.model';

@Entity('users')
export class UserEntity extends BaseModel<UserEntity> implements IUser {
  @Column({ name: 'firstName' })
  firstName: string;

  @Column({ name: 'lastName' })
  lastName: string;

  @Column({ name: 'birthdate' })
  birthdate: { day: number; month: number; year: number };

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'gender' })
  gender: boolean;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'locale' })
  locale: { currency: 'BRL' | 'USD'; language: 'Portuguese' | 'English' };

  @Column({ name: 'role' })
  role: 'admin' | 'client';
}
