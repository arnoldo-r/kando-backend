import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Buy food',
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Buy milk, bread, and eggs from the supermarket',
    description: 'Detailed task description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: TaskStatus.TODO,
    description: 'Current task status',
    enum: TaskStatus,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
