import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class TestAnswerDto {
  @ApiProperty() @IsString() questionId: string;
  @ApiProperty({ type: [String] }) @IsArray() selectedOptionIds: string[];
  @ApiProperty({ required: false }) @IsOptional() @IsString() text?: string;
}

export class SubmitTestDto {
  @ApiProperty({ type: [TestAnswerDto] }) answers: TestAnswerDto[];
}
