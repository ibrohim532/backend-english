import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlatformService } from './platform.service';
import { ContactMessageDto, CreateTestimonialDto } from './dto/platform.dto';

@ApiTags('Platform')
@Controller()
export class PlatformController {
  constructor(private readonly service: PlatformService) {}

  @Get('platform/info')
  @ApiOperation({ summary: 'Platforma haqida qisqacha ma\'lumot' })
  info() { return this.service.info(); }

  @Get('teacher')
  @ApiOperation({ summary: 'O\'qituvchi haqida' })
  teacher() { return this.service.getTeacher(); }

  @Get('testimonials')
  @ApiOperation({ summary: 'O\'quvchilar fikrlari' })
  testimonials() { return this.service.listTestimonials(); }

  @Post('testimonials')
  @ApiOperation({ summary: 'Fikr qoldirish' })
  addTestimonial(@Body() dto: CreateTestimonialDto) { return this.service.createTestimonial(dto); }

  @Get('contact/info')
  @ApiOperation({ summary: 'Bog\'lanish ma\'lumotlari (Telegram, Telefon, Email)' })
  contactInfo() { return this.service.contactInfo(); }

  @Post('contact/message')
  @ApiOperation({ summary: 'Savol yuborish formasi' })
  sendMessage(@Body() dto: ContactMessageDto) { return this.service.sendMessage(dto); }
}
