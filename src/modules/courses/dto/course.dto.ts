import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CourseFilterDto {
  @ApiProperty({ required: false }) @IsOptional() @IsString() level?: string;
}
