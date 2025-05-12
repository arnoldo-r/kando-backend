import { Injectable } from '@nestjs/common';
import { ItemDto } from './dto/item.dto';
import { StatisticRepository } from './repositories/statistic.repository';

@Injectable()
export class StatisticService {
  constructor(private readonly statisticRepository: StatisticRepository) {}

  async getStatus(): Promise<ItemDto[]> {
    return await this.statisticRepository.getStatus();
  }
}
