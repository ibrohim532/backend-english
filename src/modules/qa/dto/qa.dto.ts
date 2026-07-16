import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AskQuestionDto {
  @ApiProperty() @IsString() text: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() lessonId?: string;
}

export class AnswerQuestionDto {
  @ApiProperty() @IsString() text: string;
}
