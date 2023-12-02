import { Injectable } from '@nestjs/common';
import { CreateCompanyInviteDto } from './dto/create-company-invite.dto';
import { UpdateCompanyInviteDto } from './dto/update-company-invite.dto';

@Injectable()
export class CompanyInviteService {
  create(createCompanyInviteDto: CreateCompanyInviteDto) {
    return 'This action adds a new companyInvite';
  }

  findAll() {
    return `This action returns all companyInvite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyInvite`;
  }

  update(id: number, updateCompanyInviteDto: UpdateCompanyInviteDto) {
    return `This action updates a #${id} companyInvite`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyInvite`;
  }
}
