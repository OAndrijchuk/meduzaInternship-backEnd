import { IsNotEmpty } from 'class-validator';
import { RoleType } from 'src/types/types';

export class UpdateMemberDto {
  @IsNotEmpty()
  newRole: RoleType;

  memberId: string;
}
