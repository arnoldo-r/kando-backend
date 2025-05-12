import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserDto> {
    const user = this.userRepository.create(dto);
    const saved = await this.userRepository.save(user);
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
