import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { UserRole } from '../../common/enums/user-role.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}