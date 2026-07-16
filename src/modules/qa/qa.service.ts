import { Injectable, NotFoundException } from '@nestjs/common';
import { db, uid } from '../../common/memory-store';
import { AnswerQuestionDto, AskQuestionDto } from './dto/qa.dto';

@Injectable()
export class QaService {
  list(lessonId?: string) {
    return lessonId ? db.questions.filter((q) => q.lessonId === lessonId) : db.questions;
  }
  ask(dto: AskQuestionDto) {
    const q = { id: uid(), studentId: 'me', text: dto.text, lessonId: dto.lessonId ?? null, createdAt: new Date().toISOString(), answer: null };
    db.questions.push(q);
    return q;
  }
  answer(qid: string, dto: AnswerQuestionDto) {
    const q = db.questions.find((x) => x.id === qid);
    if (!q) throw new NotFoundException();
    q.answer = { id: uid(), teacherId: 'teacher', text: dto.text, createdAt: new Date().toISOString() };
    return q.answer;
  }
}
