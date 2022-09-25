import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MessagesHelper } from '../helpers/messages.helper';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.validateUser(data.username, data.password);
    if (!user)
      throw new NotFoundException(MessagesHelper.PASSWORD_OR_USERNAME_INVALID);

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    let user;
    try {
      user = await this.userService.findOneByUsername(username);
    } catch (error) {
      user = null;
    }

    let isPasswordValid;
    try {
      isPasswordValid = compareSync(password, user.password);
    } catch (error) {
      isPasswordValid = null;
    }

    if (user && isPasswordValid) return user;

    return null;
  }
}
