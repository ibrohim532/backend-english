import { Injectable, UnauthorizedException } from '@nestjs/common';
import { db, uid } from '../../common/memory-store';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  register(dto: RegisterDto) {
    const user = { id: uid(), ...dto, level: 'Elementary', createdAt: new Date().toISOString() };
    db.users.push(user);
    return this.token(user);
  }

  login(dto: LoginDto) {
    const user = db.users.find((u) => u.email === dto.email && u.password === dto.password);
    if (!user) throw new UnauthorizedException('Email yoki parol xato');
    return this.token(user);
  }

  refresh(_refreshToken: string) {
    const user = db.users[0] ?? { id: uid(), email: 'demo@demo.uz' };
    return this.token(user);
  }

  private token(user: any) {
    const { password, ...safe } = user;
    return { accessToken: 'mock.' + user.id, refreshToken: 'refresh.' + user.id, user: safe };
  }
}
