import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';

@Injectable()
export class UserRequestService {
  create(createUserRequestDto: CreateUserRequestDto) {
    return 'This action adds a new userRequest';
  }

  findAll() {
    return `This action returns all userRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRequest`;
  }

  update(id: number, updateUserRequestDto: UpdateUserRequestDto) {
    return `This action updates a #${id} userRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRequest`;
  }
}
