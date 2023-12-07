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
import { UserRequestService } from './user-request.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { CombinedAuthGuard } from 'src/auth/guards/combined-Auth.guard';

@UseGuards(CombinedAuthGuard)
@Controller('user-request')
export class UserRequestController {
  constructor(private readonly userRequestService: UserRequestService) {}

  @Post()
  create(@Body() createUserRequestDto: CreateUserRequestDto, @Req() req: any) {
    return this.userRequestService.create(createUserRequestDto, req.user);
  }

  @Get()
  findAll() {
    return this.userRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    return this.userRequestService.update(+id, updateUserRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRequestService.remove(+id);
  }
}
