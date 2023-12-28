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
} from '@nestjs/common';
import { CompanyInviteService } from './company-invite.service';
import { CreateCompanyInviteDto } from './dto/create-company-invite.dto';
import { UpdateCompanyInviteDto } from './dto/update-company-invite.dto';
import { CombinedAuthGuard } from 'src/auth/guards/combined-Auth.guard';
import { UserService } from 'src/user/user.service';

@UseGuards(CombinedAuthGuard)
@Controller('company/:companyId/invites/')
export class CompanyInviteController {
  constructor(
    private readonly companyInviteService: CompanyInviteService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() createCompanyInviteDto: CreateCompanyInviteDto,
    @Req() req: any,
    @Param('companyId') companyId: string,
  ) {
    // const owner = await this.userService.responseUserNormalize(req.user);
    return this.companyInviteService.create(
      +companyId,
      createCompanyInviteDto,
      req.user,
    );
  }

  @Get()
  async findAll(@Param('companyId') companyId: string, @Req() req: any) {
    const owner = await this.userService.responseUserNormalize(req.user);
    return this.companyInviteService.findAll(+companyId, owner);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const user = await this.userService.responseUserNormalize(req.user);
    return this.companyInviteService.findOne(+id, user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyInviteDto: UpdateCompanyInviteDto,
    @Req() req: any,
  ) {
    const user = await this.userService.responseUserNormalize(req.user);
    return this.companyInviteService.update(+id, updateCompanyInviteDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const user = await this.userService.responseUserNormalize(req.user);

    return this.companyInviteService.remove(+id, user);
  }
}
