import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({
    example: 'a3f1c9e2-7b2d-4c8a-9f3e-123456789abc',
    description: 'UUID',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

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
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

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
