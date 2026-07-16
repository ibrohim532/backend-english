import { Injectable } from '@nestjs/common';
import { db } from '../../common/memory-store';

@Injectable()
export class ResultsService {
  myResults() {
    const totalLessons = db.lessons.length;
    const done = db.lessons.filter((l) => l.completed).length;
    return {
      overallProgress: totalLessons ? (done / totalLessons) * 100 : 0,
      totalScore: done * 10,
      completedCourses: db.enrollments.filter((e) => e.completed).length,
      activeCourses: db.enrollments.filter((e) => !e.completed).length,
      rank: 1,
      badges: ['Starter', 'Weekly Streak'],
    };
  }
  leaderboard(period: string, limit: number) {
    return Array.from({ length: Math.min(limit, 5) }, (_, i) => ({
      rank: i + 1,
      userId: `user-${i + 1}`,
      fullName: `Student ${i + 1}`,
      avatarUrl: null,
      score: 1000 - i * 50,
      period,
    }));
  }
}
