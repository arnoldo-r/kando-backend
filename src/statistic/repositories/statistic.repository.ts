import { DataSource, Repository } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Injectable } from '@nestjs/common';
import { ItemDto } from '../dto/item.dto';
import { TaskStatus } from 'src/task/task-status.enum';
import { StatisticMapper } from '../mappers/statistic.mapper';

@Injectable()
export class StatisticRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getStatus(): Promise<ItemDto[]> {
    type StatusCountRow = { status: TaskStatus; count: string | number };

    const result = await this.createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(task.id)', 'count')
      .groupBy('task.status')
      .getRawMany<StatusCountRow>();

    const summary: Record<TaskStatus, number> = {
      [TaskStatus.TODO]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0,
    };

    result.forEach((row) => {
      summary[row.status] = Number(row.count);
    });

    return StatisticMapper.fromStatus(summary);
  }
}
