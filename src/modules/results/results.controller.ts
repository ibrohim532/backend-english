import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResultsService } from './results.service';

@ApiTags('Results')
@Controller()
export class ResultsController {
  constructor(private readonly service: ResultsService) {}

  @Get('me/results') @ApiOperation({ summary: 'Umumiy natijalar (progress, ballar)' })
  me() { return this.service.myResults(); }

  @Get('leaderboard')
  @ApiQuery({ name: 'period', required: false, enum: ['week', 'month', 'all'] })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOperation({ summary: 'Reyting (leaderboard)' })
  board(@Query('period') p = 'month', @Query('limit') l = 20) {
    return this.service.leaderboard(p, Number(l));
  }
}
