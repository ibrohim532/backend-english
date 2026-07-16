import { Injectable, NotFoundException } from '@nestjs/common';
import { db, uid } from '../../common/memory-store';

function seed() {
  if (db.certificates.length) return;
  db.certificates.push({
    id: uid(),
    courseId: db.courses[0]?.id ?? 'course-1',
    courseTitle: db.courses[0]?.title ?? 'Elementary English',
    studentName: 'Demo User',
    issuedAt: new Date().toISOString(),
    pdfUrl: 'https://example.com/cert.pdf',
    serialNumber: 'CERT-2026-0001',
  });
}

@Injectable()
export class CertificatesService {
  list() { seed(); return db.certificates; }
  detail(id: string) {
    seed();
    const c = db.certificates.find((x) => x.id === id);
    if (!c) throw new NotFoundException();
    return c;
  }
  download(id: string) {
    const c = this.detail(id);
    return { url: c.pdfUrl, filename: `${c.serialNumber}.pdf` };
  }
}
