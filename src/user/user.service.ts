import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './mappers/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (user) throw new Error('Email already registered');
    const hashed = await bcrypt.hash(dto.password, 10);
    const saved = await this.userRepository.save({ ...dto, password: hashed });
    return UserMapper.toDto(saved);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with e-mail ${email} not found`);
    }
    return UserMapper.toDto(user);
  }
}
