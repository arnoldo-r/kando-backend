import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
}
