import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'TV',
    description: 'The name of the Product',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Lorem ipsum',
    description: 'The description of the Product',
  })
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 5000000,
    description: 'The price of the Product',
  })
  readonly price: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [
      {
        filename: 'TV Samsung 52 inci.png',
        path: '\\upload\\TV Samsung 52 inci.png',
      },
    ],
    description: 'The images of the Product',
  })
  readonly images: {
    filename: string;
    path: string;
  }[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 10,
    description: 'The stock of the Product',
  })
  readonly stock: number;
}
