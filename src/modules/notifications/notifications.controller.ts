import { Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('me/notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get() @ApiQuery({ name: 'unreadOnly', required: false, type: Boolean })
  @ApiOperation({ summary: 'Bildirishnomalar (yangi darslar, testlar, e\'lonlar)' })
  list(@Query('unreadOnly') u?: string) { return this.service.list(u === 'true'); }

  @Post(':id/read') @HttpCode(204)
  @ApiOperation({ summary: 'O\'qildi deb belgilash' })
  read(@Param('id') id: string) { this.service.read(id); }
}
