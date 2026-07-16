import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class HomeworkSubmitDto {
  @ApiProperty({ required: false }) @IsOptional() @IsString() text?: string;
  @ApiProperty({ required: false, description: 'Fayl URL (mock)' }) @IsOptional() @IsString() fileUrl?: string;
}
