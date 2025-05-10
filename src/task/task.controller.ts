import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskStatusSummaryDto } from './dto/task-status-summary.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 201, description: 'Task created', type: TaskDto })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Tasks found', type: [TaskDto] })
  async findAll(): Promise<TaskDto[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task found', type: TaskDto })
  async findOne(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse({ status: 200, description: 'Task updated', type: TaskDto })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDto> {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 200, description: 'Task deleted' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<void> {
    await this.taskService.remove(id);
  }

  @Get('summary/status')
  @ApiOperation({ summary: 'Task counts by status' })
  @ApiResponse({
    status: 200,
    description: 'Status summary',
    schema: {
      example: {
        todo: 3,
        in_progress: 2,
        completed: 5,
      },
    },
  })
  async getSummaryStatus(): Promise<TaskStatusSummaryDto> {
    return await this.taskService.getSummaryStatus();
  }
}
