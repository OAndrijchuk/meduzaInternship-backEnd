import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from './create-user-request.dto';
import { StatusType } from 'src/types/types';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {
  description: string;

  status: StatusType;
}
