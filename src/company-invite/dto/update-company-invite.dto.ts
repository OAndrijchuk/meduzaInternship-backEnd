import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyInviteDto } from './create-company-invite.dto';
import { StatusType } from 'src/types/types';

export class UpdateCompanyInviteDto extends PartialType(
  CreateCompanyInviteDto,
) {
  status: StatusType;

  description: string;
}
