import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CheckEmailExist } from 'src/decorators/check-email-exist.decorator';
import { TryCatchWrapper } from 'src/decorators/error-cach.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @TryCatchWrapper()
  async findAll(page: number, limit: number) {
    const allUsers = await this.userRepository.find({
      order: {
        createdAt: 'ASC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      status_code: HttpStatus.OK,
      detail: {
        users: allUsers,
      },
      result: 'working',
    };
  }

  @TryCatchWrapper()
  @CheckEmailExist()
  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.save({
      ...createUserDto,
      password: hashPassword,
      token: '',
    });

    return {
      status_code: HttpStatus.CREATED,
      detail: {
        user,
      },
      result: 'working',
    };
  }

  @TryCatchWrapper()
  async findOneByID(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException(`User with id:${id} does not exist!`);
    }
    return {
      status_code: HttpStatus.OK,
      result: `working`,
      user,
    };
  }

  @TryCatchWrapper()
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException(`User with id:${id} does not exist!`);
    }
    const updateData = { ...updateUserDto };
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = { ...user, ...updateData };
    const newUser = await this.userRepository.save(updatedUser);

    return {
      status_code: HttpStatus.OK,
      detail: {
        user: newUser,
      },
      result: 'working',
    };
  }

  @TryCatchWrapper()
  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException(`User with id:${id} does not exist!`);
    }
    const newUser = await this.userRepository.remove(user);

    return {
      status_code: HttpStatus.OK,
      detail: {
        user: newUser,
      },
      result: 'working',
    };
  }
}
