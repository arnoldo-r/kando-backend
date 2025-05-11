import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ItemDto } from './dto/item.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('status')
  @ApiOperation({ summary: 'Task counts by status' })
  @ApiResponse({
    status: 200,
    description: 'Status summary',
    schema: {
      example: [
        { label: 'Por hacer', value: 3 },
        { label: 'En progreso', value: 2 },
        { label: 'Completadas', value: 5 },
      ],
    },
  })
  async getStatus(): Promise<ItemDto[]> {
    return await this.statisticService.getStatus();
  }
}
