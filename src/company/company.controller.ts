import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CombinedAuthGuard } from 'src/auth/guards/combined-Auth.guard';
import { UserService } from 'src/user/user.service';

@UseGuards(CombinedAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Req() req: any, @Body() createCompanyDto: CreateCompanyDto) {
    // const owner = await this.userService.responseUserNormalize(req.user);
    return this.companyService.create(createCompanyDto, req.user);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.companyService.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req: any,
  ) {
    const owner = await this.userService.responseUserNormalize(req.user);
    return this.companyService.update(+companyId, updateCompanyDto, owner);
  }

  @Delete(':id')
  async remove(@Param('id') companyId: string, @Req() req: any) {
    const owner = await this.userService.responseUserNormalize(req.user);
    return this.companyService.remove(+companyId, owner);
  }

  @Delete(':id/member')
  async removeMember(
    @Param('id') companyId: string,
    @Req() req: any,
    @Body() body: any,
  ) {
    const owner = await this.userService.responseUserNormalize(req.user);
    const { memberId } = body;
    return this.companyService.removeMember(+companyId, owner, memberId);
  }
}
