import { IUser } from '@/interfaces/user.interface';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

/*
  Please, use DTO only for incoming payload from controller, and make sure it have been correctly validated
  For other interfaces use ./src/interfaces/yourapp.interface.ts
*/

export class UpdateUserDto implements IUser {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  birthdate: { day: number; month: number; year: number };

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsBoolean()
  gender: boolean;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  locale: { currency: 'BRL' | 'USD'; language: 'Portuguese' | 'English' };
}
