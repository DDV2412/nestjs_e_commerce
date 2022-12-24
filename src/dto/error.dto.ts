import { ApiProperty } from '@nestjs/swagger';

export class ErrorDTO {
  @ApiProperty({
    example: 'false',
    description: 'The status of the Error',
  })
  readonly status: boolean;

  @ApiProperty({
    example: 'Internal server error',
    description: 'The message of the Error',
  })
  readonly message: string;

  @ApiProperty({
    example: null,
    description: 'The payload of the Error',
  })
  readonly payload: any;
}
