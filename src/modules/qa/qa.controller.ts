import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QaService } from './qa.service';
import { AnswerQuestionDto, AskQuestionDto } from './dto/qa.dto';

@ApiTags('QA')
@Controller('qa')
export class QaController {
  constructor(private readonly service: QaService) {}

  @Get('questions') @ApiQuery({ name: 'lessonId', required: false })
  @ApiOperation({ summary: 'Savollar ro\'yxati' })
  list(@Query('lessonId') l?: string) { return this.service.list(l); }

  @Post('questions') @ApiOperation({ summary: 'O\'quvchi savol yuborish' })
  ask(@Body() dto: AskQuestionDto) { return this.service.ask(dto); }

  @Post('questions/:questionId/answer') @ApiOperation({ summary: 'O\'qituvchi javob berish' })
  answer(@Param('questionId') id: string, @Body() dto: AnswerQuestionDto) { return this.service.answer(id, dto); }
}
