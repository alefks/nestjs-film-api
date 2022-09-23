import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return this.usersRepository.findOneOrFail({ where: { id: id } });
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOneOrFail({
      where: { username: username },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: id },
    });
    await this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.findOneOrFail({ where: { id: id } });
    return this.usersRepository.softDelete({ id });
  }
}
