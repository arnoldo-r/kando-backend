import { Task } from '../entities/task.entity';
import { TaskDto } from '../dto/task.dto';

export class TaskMapper {
  static toDto(task: Task): TaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
