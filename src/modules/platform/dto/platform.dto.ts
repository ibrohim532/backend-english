import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min, IsOptional, IsEmail } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({ minimum: 1, maximum: 5 }) @IsInt() @Min(1) @Max(5) rating: number;
  @ApiProperty() @IsString() text: string;
}

export class ContactMessageDto {
  @ApiProperty() @IsString() fullName: string;
  @ApiProperty({ required: false }) @IsOptional() @IsEmail() email?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() phone?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() subject?: string;
  @ApiProperty() @IsString() message: string;
}
