import { randomUUID } from 'crypto';

/**
 * Umumiy in-memory saqlash. Barcha modul servislari shu yerdan foydalanadi.
 * Loyiha qayta ishga tushganda ma'lumotlar tozalanadi (mock data qayta seed qilinadi).
 */

export const db = {
  users: [] as any[],
  testimonials: [] as any[],
  courses: [] as any[],
  enrollments: [] as any[],
  lessons: [] as any[],
  tests: [] as any[],
  testResults: [] as any[],
  materials: [] as any[],
  liveClasses: [] as any[],
  questions: [] as any[],
  notifications: [] as any[],
  certificates: [] as any[],
  payments: [] as any[],
  subscriptions: [] as any[],
  plans: [] as any[],
  promos: [] as any[],
};

export const uid = () => randomUUID();

// ---- seed ----
const teacherId = uid();
export const teacher = {
  id: teacherId,
  fullName: 'Aziza Karimova',
  bio: 'IELTS 8.0, 10+ yillik tajriba',
  avatarUrl: 'https://placehold.co/200',
  experienceYears: 10,
  certificates: ['CELTA', 'IELTS 8.0'],
  socials: { telegram: '@aziza_teacher', instagram: '', youtube: '' },
};

const levels = [
  'Elementary',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
  'IELTS',
  'Grammar',
  'Vocabulary',
  'Speaking',
];
for (const level of levels) {
  const cid = uid();
  db.courses.push({
    id: cid,
    title: `${level} English`,
    slug: level.toLowerCase(),
    level,
    shortDescription: `${level} darajasi uchun to'liq kurs`,
    coverUrl: 'https://placehold.co/600x400',
    price: 299000,
    currency: 'UZS',
    lessonsCount: 3,
    durationHours: 12,
  });
  for (let i = 1; i <= 3; i++) {
    db.lessons.push({
      id: uid(),
      courseId: cid,
      order: i,
      title: `${level} - Lesson ${i}`,
      durationMin: 25,
      hasTest: true,
      completed: false,
      videoUrl: 'https://example.com/video.mp4',
      audioUrl: 'https://example.com/audio.mp3',
      pdfUrl: 'https://example.com/notes.pdf',
      downloadable: true,
      content: 'Lesson konspekti...',
    });
  }
}

db.plans.push(
  { id: uid(), name: 'Pro Monthly', price: 99000, currency: 'UZS', periodDays: 30, features: ['Barcha kurslar', 'Jonli darslar'] },
  { id: uid(), name: 'Pro Yearly', price: 990000, currency: 'UZS', periodDays: 365, features: ['Barcha kurslar', 'Jonli darslar', '2 oy bepul'] },
);

db.promos.push({ code: 'WELCOME10', discountPercent: 10, validUntil: null, applicableCourseIds: [] });
