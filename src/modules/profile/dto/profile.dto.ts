import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ required: false }) @IsOptional() @IsString() fullName?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() phone?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() level?: string;
}

export class UserSettingsDto {
  @ApiProperty({ enum: ['uz', 'en', 'ru'] }) @IsEnum(['uz', 'en', 'ru']) language: 'uz' | 'en' | 'ru';
  @ApiProperty({ enum: ['light', 'dark', 'system'] }) @IsEnum(['light', 'dark', 'system']) theme: string;
  @ApiProperty() notifications: { email: boolean; push: boolean; telegram: boolean };
}

export class ChangePasswordDto {
  @ApiProperty() @IsString() oldPassword: string;
  @ApiProperty() @IsString() newPassword: string;
}
