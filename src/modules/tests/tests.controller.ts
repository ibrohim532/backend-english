import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestsService } from './tests.service';
import { SubmitTestDto } from './dto/test.dto';

@ApiTags('Tests')
@Controller()
export class TestsController {
  constructor(private readonly service: TestsService) {}

  @Get('lessons/:lessonId/test')
  @ApiOperation({ summary: 'Dars uchun test' })
  lesson(@Param('lessonId') id: string) { return this.service.forLesson(id); }

  @Get('courses/:courseId/final-test')
  @ApiOperation({ summary: 'Kursning yakuniy testi' })
  final(@Param('courseId') id: string) { return this.service.forCourseFinal(id); }

  @Post('tests/:testId/submit')
  @ApiOperation({ summary: 'Test javoblarini yuborish' })
  submit(@Param('testId') id: string, @Body() dto: SubmitTestDto) {
    return this.service.submit(id, dto);
  }

  @Get('tests/:testId/result')
  @ApiOperation({ summary: 'Natija va to\'g\'ri javoblar tahlili' })
  result(@Param('testId') id: string) { return this.service.result(id); }
}
