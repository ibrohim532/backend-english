import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { ApplyPromoDto, CheckoutDto, SubscribeDto } from './dto/payment.dto';

@ApiTags('Payments')
@Controller()
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Get('me/payments') @ApiOperation({ summary: 'To\'lovlar tarixi' })
  history() { return this.service.history(); }

  @Post('payments/checkout') @ApiOperation({ summary: 'Kurs sotib olish (checkout)' })
  checkout(@Body() dto: CheckoutDto) { return this.service.checkout(dto); }

  @Get('payments/:paymentId') @ApiOperation({ summary: 'To\'lov tafsiloti' })
  detail(@Param('paymentId') id: string) { return this.service.detail(id); }

  @Get('subscription/plans') @ApiOperation({ summary: 'Obuna tariflari' })
  plans() { return this.service.plans(); }

  @Get('me/subscription') @ApiOperation({ summary: 'Mening obunam' })
  mine() { return this.service.mySubscription(); }

  @Post('me/subscription') @ApiOperation({ summary: 'Obuna bo\'lish' })
  subscribe(@Body() dto: SubscribeDto) { return this.service.subscribe(dto); }

  @Delete('me/subscription') @HttpCode(204) @ApiOperation({ summary: 'Obunani bekor qilish' })
  cancel() { this.service.cancel(); }

  @Post('promo/apply') @ApiOperation({ summary: 'Promo-kod qo\'llash' })
  promo(@Body() dto: ApplyPromoDto) { return this.service.applyPromo(dto); }
}
