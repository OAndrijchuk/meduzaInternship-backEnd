import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyInviteService } from './company-invite.service';
import { CreateCompanyInviteDto } from './dto/create-company-invite.dto';
import { UpdateCompanyInviteDto } from './dto/update-company-invite.dto';

@Controller('company-invite')
export class CompanyInviteController {
  constructor(private readonly companyInviteService: CompanyInviteService) {}

  @Post()
  create(@Body() createCompanyInviteDto: CreateCompanyInviteDto) {
    return this.companyInviteService.create(createCompanyInviteDto);
  }

  @Get()
  findAll() {
    return this.companyInviteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyInviteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyInviteDto: UpdateCompanyInviteDto) {
    return this.companyInviteService.update(+id, updateCompanyInviteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyInviteService.remove(+id);
  }
}
