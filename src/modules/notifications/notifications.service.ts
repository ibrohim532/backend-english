import { Injectable } from '@nestjs/common';
import { db, uid } from '../../common/memory-store';

function seed() {
  if (db.notifications.length) return;
  db.notifications.push(
    { id: uid(), type: 'new_lesson', title: 'Yangi dars', body: 'Elementary - Lesson 4 qo\'shildi', read: false, createdAt: new Date().toISOString(), link: null },
    { id: uid(), type: 'new_test', title: 'Yangi test', body: 'Grammar testini yeching', read: false, createdAt: new Date().toISOString(), link: null },
    { id: uid(), type: 'announcement', title: 'E\'lon', body: 'Ertaga jonli dars bor', read: true, createdAt: new Date().toISOString(), link: null },
  );
}

@Injectable()
export class NotificationsService {
  list(unreadOnly = false) { seed(); return unreadOnly ? db.notifications.filter((n) => !n.read) : db.notifications; }
  read(id: string) {
    const n = db.notifications.find((x) => x.id === id);
    if (n) n.read = true;
    return { ok: true };
  }
}
