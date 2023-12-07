import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequest } from './entities/user-request.entity';
import { Repository } from 'typeorm';
import { TryCatchWrapper } from 'src/decorators/error-cach.decorator';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserRequestService {
  constructor(
    @InjectRepository(UserRequest)
    private readonly userRequestRepository: Repository<UserRequest>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  @TryCatchWrapper()
  private async checkCompany(companyId: number) {
    const existCompany = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!existCompany) {
      throw new BadRequestException(
        `Company with id ${companyId} does not exists!`,
      );
    }
    return existCompany;
  }

  async create(createUserRequestDto: CreateUserRequestDto, user: User) {
    const company = await this.checkCompany(createUserRequestDto.companyId);
    const newUserReq = await this.userRequestRepository.save({
      company,
      user,
      description: createUserRequestDto.description,
    });

    return newUserReq;
  }

  async findAll() {
    return `This action returns all userRequest`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} userRequest`;
  }

  async update(id: number, updateUserRequestDto: UpdateUserRequestDto) {
    return `This action updates a #${id} userRequest`;
  }

  async remove(id: number) {
    return `This action removes a #${id} userRequest`;
  }
}
