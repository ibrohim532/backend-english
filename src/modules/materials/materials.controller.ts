import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { HomeworkSubmitDto } from './dto/material.dto';

@ApiTags('Materials')
@Controller()
export class MaterialsController {
  constructor(private readonly service: MaterialsService) {}

  @Get('courses/:courseId/materials')
  @ApiQuery({ name: 'type', required: false, enum: ['pdf', 'vocabulary', 'grammar', 'homework'] })
  @ApiOperation({ summary: 'Kurs materiallari (PDF, Vocabulary, Grammar, Homework)' })
  list(@Param('courseId') cid: string, @Query('type') type?: string) { return this.service.list(cid, type); }

  @Get('materials/:materialId/download')
  @ApiOperation({ summary: 'Materialni yuklab olish' })
  download(@Param('materialId') id: string) { return this.service.download(id); }

  @Post('homework/:homeworkId/submit')
  @ApiOperation({ summary: 'Uy vazifasini topshirish' })
  submit(@Param('homeworkId') id: string, @Body() dto: HomeworkSubmitDto) {
    return this.service.submitHomework(id, dto);
  }
}
