import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PlatformModule } from './modules/platform/platform.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { TestsModule } from './modules/tests/tests.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { ResultsModule } from './modules/results/results.module';
import { LiveClassesModule } from './modules/live-classes/live-classes.module';
import { QaModule } from './modules/qa/qa.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    AuthModule,
    PlatformModule,
    ProfileModule,
    CoursesModule,
    LessonsModule,
    TestsModule,
    MaterialsModule,
    ResultsModule,
    LiveClassesModule,
    QaModule,
    NotificationsModule,
    CertificatesModule,
    PaymentsModule,
  ],
})
export class AppModule {}
