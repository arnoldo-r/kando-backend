import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'a3f1c9e2-7b2d-4c8a-9f3e-123456789abc',
    description: 'UUID',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'name@example.com',
    description: 'E-mail',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'eD7-845W',
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '2025-05-09T01:00:00.000Z',
    description: 'Timestamp task created',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: '2025-05-10T01:00:00.000Z',
    description: 'Timestamp task updated',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
