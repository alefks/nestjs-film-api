import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({ select: ['id', 'username'] });
  }

  async findOneById(id: number) {
    let user: UsersEntity;
    try {
      user = await this.usersRepository.findOneOrFail({
        where: { id: id },
        select: { id: true, username: true, createdAt: true },
      });
    } catch (error) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOneOrFail({
      where: { username: username },
    });
  }

  async update(id: number, body: UpdateUserDto) {
    let user: UsersEntity;
    try {
      user = await this.usersRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (error) {
      throw new NotFoundException('User not found.');
    }

    if (body.password) {
      const salt = genSaltSync();
      body.password = hashSync(body.password, salt);
    }

    await this.usersRepository.merge(user, body);
    await this.usersRepository.save(user);
  }

  async remove(id: number) {
    try {
      await this.usersRepository.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new NotFoundException();
    }

    return await this.usersRepository.softDelete({ id });
  }
}
