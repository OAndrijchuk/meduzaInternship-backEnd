import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TryCatchWrapper } from 'src/decorators/error-cach.decorator';
import { paginate } from 'src/utils/pagination.util';
import { Tokens } from './entities/tokens.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Tokens)
    private readonly tokensRepository: Repository<Tokens>,
  ) {}

  @TryCatchWrapper()
  private async checkEmail(createUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException('This email already exists!');
    }
    return existUser;
  }

  @TryCatchWrapper()
  private async checkUserExist(id) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException(`User with id:${id} does not exist!`);
    }
    return user;
  }

  @TryCatchWrapper()
  private async responseNormalize(res: object, status: number = HttpStatus.OK) {
    return {
      status_code: status,
      detail: res,
      result: 'working',
    };
  }

  @TryCatchWrapper()
  async findAll(page: number, limit: number) {
    const users = await this.userRepository.find();
    const paginatedUsers = paginate(users, { page, limit });

    return await this.responseNormalize({ users: paginatedUsers });
  }

  @TryCatchWrapper()
  async create(createUserDto: CreateUserDto) {
    await this.checkEmail(createUserDto);
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.save({
      ...createUserDto,
      password: hashPassword,
      token: '',
    });

    return await this.responseNormalize({ user }, HttpStatus.CREATED);
  }

  @TryCatchWrapper()
  async findOneByID(id: number) {
    const user = await this.checkUserExist(id);

    return await this.responseNormalize({ user });
  }

  @TryCatchWrapper()
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.checkUserExist(id);

    const updateData = { ...updateUserDto };
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = { ...user, ...updateData };
    const newUser = await this.userRepository.save(updatedUser);

    return await this.responseNormalize({ user: newUser });
  }

  @TryCatchWrapper()
  async remove(id: number) {
    const user = await this.checkUserExist(id);
    const newUser = await this.userRepository.remove(user);

    return await this.responseNormalize({ user: newUser });
  }

  @TryCatchWrapper()
  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
