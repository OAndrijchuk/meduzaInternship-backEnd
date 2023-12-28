import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequest } from './entities/user-request.entity';
import { Repository } from 'typeorm';
import { TryCatchWrapper } from 'src/decorators/error-cach.decorator';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';
import { CompanyService } from 'src/company/company.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserRequestService {
  constructor(
    @InjectRepository(UserRequest)
    private readonly userRequestRepository: Repository<UserRequest>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @TryCatchWrapper()
  private async checkCompany(companyId: number) {
    const existCompany = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['employee.userId'],
    });

    if (!existCompany) {
      throw new BadRequestException(
        `Company with id ${companyId} does not exists!`,
      );
    }
    return existCompany;
  }

  @TryCatchWrapper()
  private async checkUserRequest(company: Company, user: User) {
    const allUserRequest = await this.findAll(user);
    const existRequest = allUserRequest.filter(
      req => req.company.id === company.id,
    );
    if (existRequest.length) {
      throw new BadRequestException(`This request already exists!`);
    }
  }

  @TryCatchWrapper()
  async create(createUserRequestDto: CreateUserRequestDto, user: User) {
    const company = await this.checkCompany(createUserRequestDto.companyId);
    if (company.employee.some(worker => +worker.userId.id === +user.id)) {
      throw new BadRequestException(`You are already work in this company!`);
    }
    await this.checkUserRequest(company, user);
    const newUserReq = await this.userRequestRepository.save({
      company,
      user,
      description: createUserRequestDto.description,
    });
    const { id, userName, email, isVerify } = user;
    const response = { ...newUserReq, user: { id, userName, email, isVerify } };

    return response;
  }

  @TryCatchWrapper()
  async findAll(user: User) {
    const allRequests = await this.userRequestRepository.find({
      relations: ['user', 'company'],
    });
    const response = allRequests.filter(req => req.user.id === user.id);

    return response;
  }

  @TryCatchWrapper()
  async findOne(id: number, user: User) {
    const request = await this.userRequestRepository.findOne({
      where: { id },
      relations: ['user', 'company', 'company.owner'],
    });
    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found!`);
    }

    if (request.user.id === user.id || +request.company.owner.id === user.id) {
      return request;
    }
    throw new BadRequestException(`You do not have request with id ${id}!`);
  }

  @TryCatchWrapper()
  async update(
    id: number,
    updateUserRequestDto: UpdateUserRequestDto,
    user: User,
  ) {
    const userRequest = await this.findOne(id, user);
    if (
      +userRequest.company.owner.id === user.id &&
      updateUserRequestDto.status === 'fulfilled'
    ) {
      const company = await this.companyService.findOne(userRequest.company.id);
      const worker = await this.userService.findOneByID(userRequest.user.id);

      await this.companyRepository.update(company.id, {
        employee: [...company.employee, worker],
      });
      await this.userRepository.update(worker.id, {
        myWork: [...worker.myWork, company],
      });
      console.log('Welcome to our company!!!');
    }
    await this.userRequestRepository.update(id, updateUserRequestDto);

    return { ...userRequest, ...updateUserRequestDto };
  }

  @TryCatchWrapper()
  async remove(id: number, user: User) {
    const request = await this.findOne(id, user);
    if (request.user.id !== user.id) {
      throw new BadRequestException(`You do not have request with id ${id}!`);
    }
    await this.userRequestRepository.delete({ id });
    return request;
  }
}
