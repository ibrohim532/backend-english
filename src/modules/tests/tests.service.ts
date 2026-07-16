import { Injectable } from '@nestjs/common';
import { db, uid } from '../../common/memory-store';
import { SubmitTestDto } from './dto/test.dto';

function sampleTest(type: 'lesson' | 'final', refId: string) {
  const id = uid();
  const test = {
    id,
    title: type === 'lesson' ? 'Dars testi' : 'Yakuniy test',
    type,
    refId,
    durationMin: type === 'final' ? 60 : 10,
    questions: [
      {
        id: uid(), text: 'Choose correct: I ___ a student.', type: 'single',
        options: [
          { id: 'a', text: 'am' },
          { id: 'b', text: 'is' },
          { id: 'c', text: 'are' },
        ],
        correct: ['a'],
      },
    ],
  };
  db.tests.push(test);
  return test;
}

@Injectable()
export class TestsService {
  forLesson(lessonId: string) {
    return db.tests.find((t) => t.type === 'lesson' && t.refId === lessonId) ?? sampleTest('lesson', lessonId);
  }
  forCourseFinal(courseId: string) {
    return db.tests.find((t) => t.type === 'final' && t.refId === courseId) ?? sampleTest('final', courseId);
  }
  submit(testId: string, dto: SubmitTestDto) {
    const test = db.tests.find((t) => t.id === testId);
    if (!test) return { error: 'not found' };
    const details = test.questions.map((q: any) => {
      const ans = dto.answers.find((a) => a.questionId === q.id);
      const correct = ans && JSON.stringify(ans.selectedOptionIds.sort()) === JSON.stringify(q.correct.sort());
      return { questionId: q.id, correct: !!correct, correctOptionIds: q.correct, explanation: 'Grammatik qoidaga qarang.' };
    });
    const score = details.filter((d) => d.correct).length;
    const result = {
      testId,
      score,
      maxScore: test.questions.length,
      percent: (score / test.questions.length) * 100,
      passed: score / test.questions.length >= 0.6,
      submittedAt: new Date().toISOString(),
      details,
    };
    db.testResults.push(result);
    return result;
  }
  result(testId: string) {
    return db.testResults.find((r) => r.testId === testId) ?? { error: 'Hali yechilmagan' };
  }
}
