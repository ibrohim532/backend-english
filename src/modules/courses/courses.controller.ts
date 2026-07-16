import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CoursesService } from './courses.service';

@ApiTags('Courses')
@Controller()
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  @Get('courses')
  @ApiQuery({ name: 'level', required: false, enum: ['Elementary', 'Pre-Intermediate', 'Intermediate', 'Upper-Intermediate', 'IELTS', 'Grammar', 'Vocabulary', 'Speaking'] })
  @ApiOperation({ summary: 'Kurslar ro\'yxati' })
  list(@Query('level') level?: string) { return this.service.list(level); }

  @Get('courses/:courseId')
  @ApiOperation({ summary: 'Kurs tafsilotlari' })
  detail(@Param('courseId') id: string) { return this.service.detail(id); }

  @Post('courses/:courseId/enroll')
  @ApiOperation({ summary: 'Kursga yozilish (Hoziroq boshlash)' })
  enroll(@Param('courseId') id: string) { return this.service.enroll(id); }

  @Get('me/courses')
  @ApiOperation({ summary: 'Mening kurslarim' })
  my() { return this.service.myCourses(); }

  @Get('me/courses/:courseId/progress')
  @ApiOperation({ summary: 'Kurs bo\'yicha progress' })
  progress(@Param('courseId') id: string) { return this.service.progress(id); }
}
