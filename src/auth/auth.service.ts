import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { devConfig } from 'src/config';
import { IUser } from 'src/user/interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // generate JWT Token
  async generateJWT(user: IUser): Promise<string> {
    const { expiresIn } = devConfig.jwt;
    return await this.jwtService.signAsync({ user }, { expiresIn });
  }

  // hash password (before savign DB record). User signup use case.
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  // compare password. User login use case.
  async comparePassword(
    newPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(newPassword, hashedPassword);
  }
}
