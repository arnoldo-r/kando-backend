import { DataSource, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Injectable } from '@nestjs/common';
import { TaskStatusSummaryDto } from '../dto/task-status-summary.dto';
import { TaskStatus } from '../task-status.enum';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getSummaryStatus(): Promise<TaskStatusSummaryDto> {
    type StatusCountRow = { status: TaskStatus; count: number };

    const result = await this.createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(task.id)', 'count')
      .groupBy('task.status')
      .getRawMany<StatusCountRow>();

    const stats: TaskStatusSummaryDto = {
      [TaskStatus.TODO]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0,
    };

    result.forEach((row) => {
      stats[row.status] = Number(row.count);
    });

    return stats;
  }
}
