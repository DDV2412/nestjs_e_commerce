import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { IProduct } from 'src/interfaces/product.interface';
import { IUser } from 'src/interfaces/user.interface';
import { Status } from 'src/utils/enum';

export class WarrantyDTO {
  @IsNotEmpty()
  @ApiProperty({
    example: {
      name: 'TV',
      description: 'Lorem ipsum',
      price: 5000000,
      images: [
        {
          filename: 'TV Samsung 52 inci.png',
          path: '\\upload\\TV Samsung 52 inci.png',
          _id: '63a6e5ef6b6cf42a1623b205',
        },
      ],
      stock: 10,
      _id: '63a6e5ef6b6cf42a1623b204',
      __v: 0,
    },
    description: 'The product is the warranty claim',
  })
  readonly product: IProduct;
  @IsNotEmpty()
  @ApiProperty({
    example: {
      _id: '63a6be44f5eef6b86fc00c9b',
      name: 'admin2412',
      email: 'admin@mail.com',
      roleName: 'CUSTOMER',
      photoProfile:
        'https://images.unsplash.com/photo-1630710478039-9c680b99f800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      __v: 0,
    },
    description: 'The customer is the warranty claim',
  })
  readonly customer: IUser;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 123457890,
    description: 'The warranty ID is the warranty claim',
  })
  readonly warrantyNumber: number;
  @IsEmpty()
  @ApiProperty({
    example: Status.REJECT,
    description: 'The status warranty is the warranty claim',
  })
  readonly isStatus: Status;
  @IsArray()
  @ApiProperty({
    example: [],
    description: 'The detail is the warranty claim',
  })
  readonly details: [];
}
