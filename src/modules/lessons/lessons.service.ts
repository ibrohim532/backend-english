import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../common/memory-store';

@Injectable()
export class LessonsService {
  list(courseId: string) { return db.lessons.filter((l) => l.courseId === courseId); }
  detail(id: string) {
    const l = db.lessons.find((x) => x.id === id);
    if (!l) throw new NotFoundException('Dars topilmadi');
    return l;
  }
  complete(id: string) {
    const l = this.detail(id);
    l.completed = true;
    return { ok: true };
  }
  download(id: string, resource: 'video' | 'audio' | 'pdf') {
    const l = this.detail(id);
    const map: any = { video: l.videoUrl, audio: l.audioUrl, pdf: l.pdfUrl };
    return { url: map[resource], resource };
  }
}
