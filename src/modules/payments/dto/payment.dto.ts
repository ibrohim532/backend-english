import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CheckoutDto {
  @ApiProperty() @IsString() courseId: string;
  @ApiProperty({ enum: ['click', 'payme', 'uzcard', 'humo', 'stripe'] })
  @IsEnum(['click', 'payme', 'uzcard', 'humo', 'stripe']) method: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() promoCode?: string;
}

export class SubscribeDto {
  @ApiProperty() @IsString() planId: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() promoCode?: string;
}

export class ApplyPromoDto {
  @ApiProperty() @IsString() code: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() courseId?: string;
}
