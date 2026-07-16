import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';

@ApiTags('Lessons')
@Controller()
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  @Get('courses/:courseId/lessons')
  @ApiOperation({ summary: 'Kursdagi darslar ro\'yxati' })
  list(@Param('courseId') id: string) { return this.service.list(id); }

  @Get('lessons/:lessonId')
  @ApiOperation({ summary: 'Dars tafsiloti (video, audio, konspekt)' })
  detail(@Param('lessonId') id: string) { return this.service.detail(id); }

  @Post('lessons/:lessonId/complete') @HttpCode(204)
  @ApiOperation({ summary: 'Darsni tugatilgan deb belgilash' })
  complete(@Param('lessonId') id: string) { this.service.complete(id); }

  @Get('lessons/:lessonId/download/:resource')
  @ApiParam({ name: 'resource', enum: ['video', 'audio', 'pdf'] })
  @ApiOperation({ summary: 'Dars materialini yuklab olish (mock URL)' })
  download(@Param('lessonId') id: string, @Param('resource') r: 'video' | 'audio' | 'pdf') {
    return this.service.download(id, r);
  }
}
