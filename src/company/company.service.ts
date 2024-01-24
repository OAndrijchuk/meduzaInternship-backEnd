import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { TryCatchWrapper } from 'src/decorators/error-cach.decorator';
import { IResponsUser, RoleType } from 'src/types/types';
import { paginate } from 'src/utils/pagination.util';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Members } from './entities/members.entity';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Members)
    private readonly membersRepository: Repository<Members>,
    private readonly userService: UserService,
  ) {}

  @TryCatchWrapper()
  private async checkCompanyExist(companyName: string, owner: IResponsUser) {
    const existCompany = await this.companyRepository.find({
      where: { companyName },
      relations: ['owner', 'employee'],
    });
    const isExist = existCompany.some(company => company.owner.id === owner.id);
    if (isExist) {
      throw new BadRequestException(
        'This company name in this owner already exists!',
      );
    }
    return existCompany;
  }
  @TryCatchWrapper()
  async checkCompany(id: number, owner: IResponsUser) {
    const existCompany = await this.companyRepository.findOne({
      where: { id },
      relations: ['owner', 'employee'],
    });
    if (!existCompany) {
      throw new BadRequestException(`This company doesn't exists!`);
    }
    if (existCompany.owner.id === owner.id) return existCompany;
    throw new BadRequestException(`This company in this owner doesn't exists!`);
  }

  @TryCatchWrapper()
  async create(
    createCompanyDto: CreateCompanyDto,
    // owner: IResponsUser,
    allOwner: User,
  ) {
    const owner = await this.userService.responseUserNormalize(allOwner);
    await this.checkCompanyExist(createCompanyDto.companyName, owner);

    const company = await this.companyRepository.save({
      ...createCompanyDto,
      owner,
    });

    await this.membersRepository.save({
      companyId: company,
      userId: owner,
      role: RoleType.Owner,
    });

    const newEmployee = owner;
    return { ...company, employee: [newEmployee] };
  }
  @TryCatchWrapper()
  async findAll(page: number, limit: number) {
    const companies = await this.companyRepository.find({
      relations: [
        'owner',
        'invitations',
        'invitations.user',
        'candidates',
        'candidates.user',
        'employee',
        'employee.userId',
      ],
    });

    const paginatedCompanies = paginate(companies, { page, limit });
    return paginatedCompanies;
  }

  @TryCatchWrapper()
  async findOne(id: number) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: [
        'owner',
        'invitations',
        'invitations.user',
        'invitations.company.owner',
        'candidates',
        'candidates.user',
        'candidates.company.owner',
        'employee.userId',
      ],
    });
    if (!company) {
      throw new BadRequestException(`Company with id:${id} does not exist!`);
    }
    return company;
  }

  @TryCatchWrapper()
  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    owner: IResponsUser,
  ) {
    if (updateCompanyDto.companyName) {
      await this.checkCompanyExist(updateCompanyDto.companyName, owner);
    }
    const company = await this.checkCompany(id, owner);

    const newCompany = await this.companyRepository.save({
      ...company,
      ...updateCompanyDto,
    });
    return newCompany;
  }
  @TryCatchWrapper()
  async remove(id: number, owner: IResponsUser) {
    const company = await this.checkCompany(id, owner);

    await this.companyRepository.remove(company);

    return company;
  }
  @TryCatchWrapper()
  async removeMember(id: number, owner: IResponsUser, memberId: number) {
    const companyId = await this.findOne(id);
    const userId = await this.userService.findOneByID(memberId);
    if (+companyId.owner.id === +owner.id || +userId.id === +owner.id) {
      await this.membersRepository.delete({
        userId,
        companyId,
      });
    } else {
      throw new BadRequestException(
        `You do not have sufficient rights to perform this action!`,
      );
    }

    return companyId;
  }

  @TryCatchWrapper()
  async updateMember(
    id: number,
    owner: IResponsUser,
    updateMemberDto: UpdateMemberDto,
  ) {
    const { memberId, newRole } = updateMemberDto;
    const companyId = await this.findOne(id);
    const member = await this.membersRepository.findOne({
      where: { id: +memberId },
      relations: ['userId', 'companyId'],
    });
    if (+companyId.owner.id === +owner.id && member) {
      return await this.membersRepository.save({
        ...member,
        role: newRole,
      });
    } else {
      throw new BadRequestException(
        `You do not have sufficient rights to perform this action!`,
      );
    }
  }

  @TryCatchWrapper()
  async getCompanyAdmins(id: number) {
    const admins = await this.membersRepository.find({
      where: { role: RoleType.Admin, companyId: { id } },
      relations: ['userId'],
    });
    return admins;
  }
}
