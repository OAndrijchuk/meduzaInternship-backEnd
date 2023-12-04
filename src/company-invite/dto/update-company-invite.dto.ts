import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyInviteDto } from './create-company-invite.dto';

export class UpdateCompanyInviteDto extends PartialType(CreateCompanyInviteDto) {}
