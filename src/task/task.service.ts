import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';
import { TaskRepository } from './repositories/task.repository';
import { TaskMapper } from './mappers/task.mapper';
import { TaskStatusSummaryDto } from './dto/task-status-summary.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(dto: CreateTaskDto): Promise<TaskDto> {
    const task = this.taskRepository.create(dto);
    const saved = await this.taskRepository.save(task);
    return TaskMapper.toDto(saved);
  }

  async findAll(): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.find();
    return tasks.map((task) => TaskMapper.toDto(task));
  }

  async findOne(id: string): Promise<TaskDto> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return TaskMapper.toDto(task);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<TaskDto> {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    const updated = await this.taskRepository.save(task);
    return TaskMapper.toDto(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.taskRepository.delete(id);
  }

  async getSummaryStatus(): Promise<TaskStatusSummaryDto> {
    return await this.taskRepository.getSummaryStatus();
  }
}
