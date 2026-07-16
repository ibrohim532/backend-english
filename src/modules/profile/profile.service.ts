import { Injectable } from '@nestjs/common';
import { db, uid } from '../../common/memory-store';
import { ChangePasswordDto, UpdateProfileDto, UserSettingsDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  private settings: UserSettingsDto = {
    language: 'uz',
    theme: 'system',
    notifications: { email: true, push: true, telegram: false },
  };

  private ensureMe() {
    if (!db.users.length) {
      db.users.push({
        id: uid(), fullName: 'Demo User', email: 'demo@demo.uz',
        phone: '+998900000000', avatarUrl: null, level: 'Pre-Intermediate',
        createdAt: new Date().toISOString(),
      });
    }
    const { password, ...safe } = db.users[0];
    return safe;
  }

  getProfile() { return this.ensureMe(); }

  updateProfile(dto: UpdateProfileDto) {
    this.ensureMe();
    Object.assign(db.users[0], dto);
    return this.ensureMe();
  }

  uploadAvatar() {
    this.ensureMe();
    db.users[0].avatarUrl = 'https://placehold.co/200';
    return { avatarUrl: db.users[0].avatarUrl };
  }

  getSettings() { return this.settings; }
  updateSettings(dto: UserSettingsDto) { this.settings = dto; return this.settings; }
  changePassword(_dto: ChangePasswordDto) { return { ok: true }; }
}
