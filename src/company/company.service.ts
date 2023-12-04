import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { TryCatchWrapper } from 'src/decorators/error-cach.decorator';
import { IResponsUser } from 'src/types/types';
import { paginate } from 'src/utils/pagination.util';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  @TryCatchWrapper()
  private async checkCompanyExist(companyName: string, owner: IResponsUser) {
    const existCompany = await this.companyRepository.findOne({
      where: { companyName, owner },
    });

    if (existCompany) {
      throw new BadRequestException(
        'This company name in this owner already exists!',
      );
    }
    return existCompany;
  }
  @TryCatchWrapper()
  private async checkCompany(id: number, owner: IResponsUser) {
    const existCompany = await this.companyRepository.findOne({
      where: { id, owner },
    });

    if (!existCompany) {
      throw new BadRequestException(
        `This company in this owner doesn't exists!`,
      );
    }
    return existCompany;
  }

  @TryCatchWrapper()
  async create(createCompanyDto: CreateCompanyDto, owner: IResponsUser) {
    await this.checkCompanyExist(createCompanyDto.companyName, owner);
    const company = await this.companyRepository.save({
      ...createCompanyDto,
      owner,
    });

    return company;
  }
  @TryCatchWrapper()
  async findAll(page: number, limit: number) {
    const companies = await this.companyRepository.find();
    const paginatedCompanies = paginate(companies, { page, limit });
    return paginatedCompanies;
  }

  @TryCatchWrapper()
  async findOne(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });
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

    await this.companyRepository.delete({
      id,
    });

    return company;
  }
}
