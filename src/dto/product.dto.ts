import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty({
    example: 'TV',
    description: 'The name of the Product',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Lorem ipsum',
    description: 'The description of the Product',
  })
  readonly description: string;

  @ApiProperty({
    example: 5000000,
    description: 'The price of the Product',
  })
  readonly price: number;

  @ApiProperty({
    example: [
      {
        name: 'TV Samsung 52 inci.png',
        path: '\\upload\\TV Samsung 52 inci.png',
      },
    ],
    description: 'The images of the Product',
  })
  readonly images: {
    filename: string;
    path: string;
  }[];

  @ApiProperty({
    example: 10,
    description: 'The stock of the Product',
  })
  readonly stock: number;
}
