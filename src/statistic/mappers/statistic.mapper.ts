import { ItemDto } from '../dto/item.dto';
import { TaskStatus } from 'src/task/task-status.enum';

export class StatisticMapper {
  static fromStatus(summary: Record<TaskStatus, number>): ItemDto[] {
    const statusLabelMap: Record<TaskStatus, string> = {
      [TaskStatus.TODO]: 'Por hacer',
      [TaskStatus.IN_PROGRESS]: 'En progreso',
      [TaskStatus.COMPLETED]: 'Completadas',
    };

    const allStatuses = Object.values(TaskStatus) as TaskStatus[];

    return allStatuses.map((status) => ({
      label: statusLabelMap[status] ?? status,
      value: summary[status] ?? 0,
    }));
  }
}
