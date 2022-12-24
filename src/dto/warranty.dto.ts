import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Status } from 'src/utils/enum';
import { ProductDTO } from './product.dto';
import { UserDTO } from './user.dto';

export class WarrantyDTO {
  readonly product: ProductDTO;
  readonly customer: UserDTO;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 123457890,
    description: 'The warranty ID is the warranty claim',
  })
  readonly warrantyNumber: number;

  @IsNotEmpty()
  @ApiProperty({
    example: Status.PENDING,
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
