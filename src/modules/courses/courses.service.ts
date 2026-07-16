import { Injectable, NotFoundException } from '@nestjs/common';
import { db, teacher, uid } from '../../common/memory-store';

@Injectable()
export class CoursesService {
  list(level?: string) {
    return level ? db.courses.filter((c) => c.level === level) : db.courses;
  }
  detail(id: string) {
    const c = db.courses.find((x) => x.id === id);
    if (!c) throw new NotFoundException('Kurs topilmadi');
    return { ...c, teacher, lessons: db.lessons.filter((l) => l.courseId === id), whatYouLearn: ['Speaking', 'Listening', 'Grammar'], requirements: ['Kompyuter yoki telefon'] };
  }
  enroll(id: string) {
    const c = db.courses.find((x) => x.id === id);
    if (!c) throw new NotFoundException();
    const e = { id: uid(), course: c, enrolledAt: new Date().toISOString(), progress: 0, lastLessonId: null, completed: false };
    db.enrollments.push(e);
    return e;
  }
  myCourses() { return db.enrollments; }
  progress(courseId: string) {
    const lessons = db.lessons.filter((l) => l.courseId === courseId);
    const done = lessons.filter((l) => l.completed).length;
    return {
      courseId,
      totalLessons: lessons.length,
      completedLessons: done,
      percent: lessons.length ? (done / lessons.length) * 100 : 0,
      score: done * 10,
      certificateAvailable: done === lessons.length && lessons.length > 0,
    };
  }
}
