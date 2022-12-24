import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { SecurityType } from '../utils/enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTORegister {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Anang Nugraha',
    description: 'The name of the User',
  })
  readonly name: string;

  @IsEmail()
  @MaxLength(64)
  @ApiProperty({
    example: 'anang@mail.com',
    description: 'The email of the User',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'hashing', description: 'The password of the User' })
  readonly password: string;

  @IsEnum(SecurityType)
  @ApiProperty({
    example: 'CUSTOMER',
    name: 'role name',
    description: 'The role name of the User',
  })
  readonly roleName: string;
}

export class UserDTOLogin {
  @IsEmail()
  @MaxLength(64)
  @ApiProperty({
    example: 'anang@mail.com',
    description: 'The email of the User',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'hashing', description: 'The password of the User' })
  readonly password: string;
}
