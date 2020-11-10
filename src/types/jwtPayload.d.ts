import { UserEntity } from '@/entities/user.entity';

export type jwtPayload = Pick<UserEntity, 'role' | 'email'>;
