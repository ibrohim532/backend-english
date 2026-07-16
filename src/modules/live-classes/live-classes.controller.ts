import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LiveClassesService } from './live-classes.service';

@ApiTags('LiveClasses')
@Controller('live-classes')
export class LiveClassesController {
  constructor(private readonly service: LiveClassesService) {}

  @Get() @ApiOperation({ summary: 'Jonli darslar jadvali' })
  list() { return this.service.list(); }

  @Get(':liveId') @ApiOperation({ summary: 'Jonli dars tafsiloti (Zoom/Meet havolasi)' })
  detail(@Param('liveId') id: string) { return this.service.detail(id); }

  @Get(':liveId/recording') @ApiOperation({ summary: 'Dars yozuvi' })
  recording(@Param('liveId') id: string) { return this.service.recording(id); }
}
