import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ItemDto {
  @ApiProperty({
    example: 'Por hacer',
    description: 'Categoría del dato',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    example: 5,
    description: 'Cantidad',
  })
  @IsNumber()
  value: number;
}
