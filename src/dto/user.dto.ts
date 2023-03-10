import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SecurityType, Status } from '../utils/enum';
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
  @MinLength(8)
  @ApiProperty({ example: 'hashing', description: 'The password of the User' })
  readonly password: string;

  @IsEnum(SecurityType)
  @ApiProperty({
    example: 'CUSTOMER',
    name: 'roleName',
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
  @MinLength(8)
  @ApiProperty({ example: 'hashing', description: 'The password of the User' })
  readonly password: string;
}

export class UserDTO {
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

  @IsEnum(SecurityType)
  @ApiProperty({
    example: 'CUSTOMER',
    name: 'roleName',
    description: 'The role name of the User',
  })
  readonly roleName: string;

  @ApiProperty({
    example: 'hashing',
    name: 'password',
    description: 'The password of the User',
  })
  readonly password: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1630710478039-9c680b99f800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    name: 'photoProfile',
    description: 'The photo profile of the User',
  })
  readonly photoProfile: string;

  @IsEnum(Status)
  @ApiProperty({
    example: Status.APPROVE,
    name: 'isStatus',
    description: 'The status account of the User',
  })
  readonly isStatus: Status;
}
