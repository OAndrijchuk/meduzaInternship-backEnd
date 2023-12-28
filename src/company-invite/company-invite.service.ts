import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyInviteDto } from './dto/create-company-invite.dto';
import { UpdateCompanyInviteDto } from './dto/update-company-invite.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyInvite } from './entities/company-invite.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { TryCatchWrapper } from 'src/decorators/error-cach.decorator';
import { CompanyService } from 'src/company/company.service';
import { IResponsUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';
import { Members } from 'src/company/entities/members.entity';

@Injectable()
export class CompanyInviteService {
  constructor(
    @InjectRepository(CompanyInvite)
    private readonly companyInviteRepository: Repository<CompanyInvite>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Members)
    private readonly membersRepository: Repository<Members>,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @TryCatchWrapper()
  private async checkCompanyInvite(
    companyId: number,
    user: IResponsUser,
    userId: number,
  ) {
    const allCompanyInvites = await this.findAll(companyId, user);
    const existInvite = allCompanyInvites.filter(
      invite => invite.user.id === userId,
    );
    if (existInvite.length) {
      throw new BadRequestException(`This invite already exists!`);
    }
    if (+user.id === userId) {
      throw new BadRequestException(`This user already in your company!`);
    }
  }
  @TryCatchWrapper()
  async create(
    companyId: number,
    createCompanyInviteDto: CreateCompanyInviteDto,
    user: IResponsUser,
  ) {
    const company = await this.companyService.checkCompany(companyId, user);
    const isUserInEmployee = company.employee.some(
      worker => +worker.id === +createCompanyInviteDto.userId,
    );

    if (isUserInEmployee) {
      throw new BadRequestException(`This user already in your company!`);
    }

    await this.checkCompanyInvite(
      companyId,
      user,
      createCompanyInviteDto.userId,
    );
    const candidate = await this.userService.findOneByID(
      createCompanyInviteDto.userId,
    );

    const newInvite = await this.companyInviteRepository.save({
      company,
      user: candidate,
      description: createCompanyInviteDto.description,
    });
    return newInvite;
  }

  @TryCatchWrapper()
  async findAll(companyId: number, user: IResponsUser) {
    await this.companyService.checkCompany(companyId, user);
    const allInvites = await this.companyInviteRepository.find({
      relations: ['user', 'company'],
    });

    const companyInvites = allInvites.filter(
      invite => invite.company.id === companyId,
    );

    return companyInvites;
  }

  @TryCatchWrapper()
  async findOne(id: number, user: IResponsUser) {
    const invite = await this.companyInviteRepository.findOne({
      where: { id },
      relations: ['user', 'company', 'company.owner'],
    });
    if (!invite) {
      throw new NotFoundException(`Invite with id ${id} not found!!`);
    }
    if (+invite.user.id === +user.id || +invite.company.owner.id === +user.id) {
      return invite;
    }
    throw new BadRequestException(`You do not have invite with id ${id}!`);
  }

  @TryCatchWrapper()
  async update(
    id: number,
    updateCompanyInviteDto: UpdateCompanyInviteDto,
    user: IResponsUser,
  ) {
    const invite = await this.findOne(id, user);
    if (updateCompanyInviteDto.status === 'pending') {
      throw new BadRequestException(`You cannot change this value on pending!`);
    }
    if (
      +invite.company.owner.id === +user.id &&
      updateCompanyInviteDto.status === 'fulfilled'
    ) {
      throw new BadRequestException(
        `You cannot change this value on fulfilled!`,
      );
    }
    if (+invite.user.id === +user.id && updateCompanyInviteDto.status) {
      const company = await this.companyService.findOne(invite.company.id);
      const worker = await this.userService.findOneByID(+user.id);

      if (updateCompanyInviteDto.status === 'fulfilled') {
        await this.membersRepository.save({
          companyId: company,
          userId: worker,
        });
        await this.companyInviteRepository.delete(id);
      }
      if (updateCompanyInviteDto.status === 'rejected') {
        await this.companyInviteRepository.delete(id);
      }
    }
    return invite;
  }

  @TryCatchWrapper()
  async remove(id: number, user: IResponsUser) {
    const invite = await this.findOne(id, user);
    if (+invite.company.owner.id === +user.id) {
      await this.companyInviteRepository.delete(id);
    }
    return invite;
  }
}
