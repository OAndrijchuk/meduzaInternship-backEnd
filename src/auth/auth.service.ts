import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user && isPasswordValid) {
      return user;
    }
    throw new UnauthorizedException('User os password are incorrect');
  }

  async login(user: IUser) {
    const { id, email, userName } = user;
    return {
      id,
      email,
      userName,
      token: this.jwtService.sign({
        id,
        email,
        userName,
      }),
    };
  }
}
