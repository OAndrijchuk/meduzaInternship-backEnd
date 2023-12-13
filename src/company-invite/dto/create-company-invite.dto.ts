import { IsNotEmpty } from "class-validator";

export class CreateCompanyInviteDto {
  @IsNotEmpty()
  userId: number;

  description: string;
}
