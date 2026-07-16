import { Injectable, NotFoundException } from '@nestjs/common';
import { db, uid } from '../../common/memory-store';

function seed() {
  if (db.liveClasses.length) return;
  db.liveClasses.push({
    id: uid(),
    title: 'Speaking Club - Weekly',
    courseId: null,
    startsAt: new Date(Date.now() + 86400000).toISOString(),
    durationMin: 60,
    platform: 'zoom',
    status: 'scheduled',
    joinUrl: 'https://zoom.us/j/mock123',
    recordingUrl: null,
    description: 'Haftalik jonli speaking mashg\'ulot',
  });
}

@Injectable()
export class LiveClassesService {
  list() { seed(); return db.liveClasses; }
  detail(id: string) {
    seed();
    const l = db.liveClasses.find((x) => x.id === id);
    if (!l) throw new NotFoundException();
    return l;
  }
  recording(id: string) {
    const l = this.detail(id);
    return { url: l.recordingUrl ?? 'https://example.com/recording.mp4', duration: 3600 };
  }
}
