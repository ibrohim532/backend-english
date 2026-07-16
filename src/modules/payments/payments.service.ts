import { Injectable, NotFoundException } from '@nestjs/common';
import { db, uid } from '../../common/memory-store';
import { ApplyPromoDto, CheckoutDto, SubscribeDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  history() { return db.payments; }
  checkout(dto: CheckoutDto) {
    const course = db.courses.find((c) => c.id === dto.courseId);
    if (!course) throw new NotFoundException('Kurs topilmadi');
    let amount = course.price;
    if (dto.promoCode) {
      const p = db.promos.find((x) => x.code === dto.promoCode);
      if (p?.discountPercent) amount = amount - (amount * p.discountPercent) / 100;
    }
    const payment = {
      id: uid(), amount, currency: course.currency, method: dto.method, status: 'paid',
      courseId: dto.courseId, subscriptionId: null, promoCode: dto.promoCode ?? null,
      createdAt: new Date().toISOString(),
    };
    db.payments.push(payment);
    return payment;
  }
  detail(id: string) {
    const p = db.payments.find((x) => x.id === id);
    if (!p) throw new NotFoundException();
    return p;
  }

  plans() { return db.plans; }
  mySubscription() { return db.subscriptions[0] ?? null; }
  subscribe(dto: SubscribeDto) {
    const plan = db.plans.find((p) => p.id === dto.planId);
    if (!plan) throw new NotFoundException('Tarif topilmadi');
    const sub = {
      id: uid(), plan, status: 'active',
      startsAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + plan.periodDays * 86400000).toISOString(),
      autoRenew: true,
    };
    db.subscriptions.unshift(sub);
    return sub;
  }
  cancel() { if (db.subscriptions[0]) db.subscriptions[0].status = 'canceled'; return { ok: true }; }

  applyPromo(dto: ApplyPromoDto) {
    const p = db.promos.find((x) => x.code === dto.code);
    if (!p) throw new NotFoundException('Promo-kod topilmadi');
    return { code: p.code, discountPercent: p.discountPercent, discountAmount: null, validUntil: p.validUntil, applicableCourseIds: p.applicableCourseIds };
  }
}
