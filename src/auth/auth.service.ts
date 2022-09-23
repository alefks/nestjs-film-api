import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.findOneByUsername(username);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
