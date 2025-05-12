import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { StatisticRepository } from './repositories/statistic.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule],
  controllers: [StatisticController],
  providers: [StatisticService, StatisticRepository],
  exports: [StatisticService],
})
export class StatisticModule {}
