import { Injectable } from '@nestjs/common';
import { db, uid } from '../../common/memory-store';
import { HomeworkSubmitDto } from './dto/material.dto';

@Injectable()
export class MaterialsService {
  list(courseId: string, type?: string) {
    if (!db.materials.find((m) => m.courseId === courseId)) {
      db.materials.push(
        { id: uid(), courseId, lessonId: null, title: 'Course PDF', type: 'pdf', url: 'https://example.com/course.pdf', sizeKb: 1200 },
        { id: uid(), courseId, lessonId: null, title: 'Vocabulary list', type: 'vocabulary', url: 'https://example.com/vocab.pdf', sizeKb: 300 },
        { id: uid(), courseId, lessonId: null, title: 'Grammar notes', type: 'grammar', url: 'https://example.com/grammar.pdf', sizeKb: 500 },
        { id: uid(), courseId, lessonId: null, title: 'Homework #1', type: 'homework', url: 'https://example.com/hw1.pdf', sizeKb: 200 },
      );
    }
    const all = db.materials.filter((m) => m.courseId === courseId);
    return type ? all.filter((m) => m.type === type) : all;
  }
  download(id: string) {
    const m = db.materials.find((x) => x.id === id);
    return m ? { url: m.url, filename: m.title } : { error: 'not found' };
  }
  submitHomework(homeworkId: string, dto: HomeworkSubmitDto) {
    return { id: uid(), homeworkId, ...dto, submittedAt: new Date().toISOString(), status: 'submitted' };
  }
}
