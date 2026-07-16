import { Injectable } from '@nestjs/common';
import { db, teacher, uid } from '../../common/memory-store';
import { ContactMessageDto, CreateTestimonialDto } from './dto/platform.dto';

@Injectable()
export class PlatformService {
  info() {
    return {
      name: 'English Learning Platform',
      description: 'Ingliz tilini onlayn o\'rganish uchun to\'liq platforma',
      studentsCount: 1200,
      coursesCount: db.courses.length,
      rating: 4.9,
      ctaText: 'Hoziroq boshlash',
    };
  }
  getTeacher() { return teacher; }
  listTestimonials() { return db.testimonials; }
  createTestimonial(dto: CreateTestimonialDto) {
    const t = { id: uid(), studentName: 'Anonim', ...dto, createdAt: new Date().toISOString() };
    db.testimonials.push(t);
    return t;
  }
  contactInfo() {
    return {
      telegram: '@englishplatform',
      phone: '+998 90 123 45 67',
      email: 'info@englishplatform.uz',
      address: 'Toshkent, O\'zbekiston',
    };
  }
  sendMessage(dto: ContactMessageDto) {
    return { ok: true, receivedAt: new Date().toISOString(), ...dto };
  }
}
