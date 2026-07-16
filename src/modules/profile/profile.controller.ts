import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { ChangePasswordDto, UpdateProfileDto, UserSettingsDto } from './dto/profile.dto';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('me')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get('profile') @ApiOperation({ summary: 'Profilni ko\'rish' })
  get() { return this.service.getProfile(); }

  @Put('profile') @ApiOperation({ summary: 'Profilni tahrirlash' })
  update(@Body() dto: UpdateProfileDto) { return this.service.updateProfile(dto); }

  @Post('avatar') @ApiOperation({ summary: 'Avatar yuklash (mock)' })
  avatar() { return this.service.uploadAvatar(); }

  @Get('settings') @ApiOperation({ summary: 'Sozlamalarni olish' })
  settings() { return this.service.getSettings(); }

  @Put('settings') @ApiOperation({ summary: 'Sozlamalarni yangilash' })
  saveSettings(@Body() dto: UserSettingsDto) { return this.service.updateSettings(dto); }

  @Put('settings/password') @HttpCode(204) @ApiOperation({ summary: 'Parolni o\'zgartirish' })
  changePassword(@Body() dto: ChangePasswordDto) { this.service.changePassword(dto); }
}
