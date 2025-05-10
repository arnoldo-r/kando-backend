import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';
import { TaskRepository } from './repositories/task.repository';
import { TaskMapper } from './mappers/task.mapper';

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
    await this.taskRepository.update(id, dto);
    const updated = await this.taskRepository.findOneBy({ id });
    if (!updated) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return TaskMapper.toDto(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
