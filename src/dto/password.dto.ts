import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'hashing',
    description: 'The current password of the User',
  })
  readonly currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'hashing',
    description: 'The password of the User',
  })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'hashing',
    description: 'The confirm password of the User',
  })
  readonly confirmPassword: string;
}
