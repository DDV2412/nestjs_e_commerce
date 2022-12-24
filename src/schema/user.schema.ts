import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '../utils/enum';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User {
  @Prop()
  @ApiProperty({
    example: 'Anang Nugraha',
    description: 'The name of the User',
  })
  name: string;

  @Prop()
  @ApiProperty({
    example: 'anang@mail.com',
    description: 'The email of the User',
  })
  email: string;

  @Prop()
  @ApiProperty({ example: 'hashing', description: 'The password of the User' })
  password: string;

  @Prop()
  @ApiProperty({
    example: 'CUSTOMER',
    description: 'The role name of the User',
  })
  roleName: string;

  @Prop()
  @ApiProperty({ example: true, description: 'The account verify of the User' })
  isVerify: boolean;

  @Prop()
  @ApiProperty({ example: true, description: 'The status account of the User' })
  isStatus: Status;

  @Prop()
  @ApiProperty({ example: null, description: 'The photo profile of the User' })
  photoProfile: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
