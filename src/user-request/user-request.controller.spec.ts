import { Test, TestingModule } from '@nestjs/testing';
import { UserRequestController } from './user-request.controller';
import { UserRequestService } from './user-request.service';

describe('UserRequestController', () => {
  let controller: UserRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRequestController],
      providers: [UserRequestService],
    }).compile();

    controller = module.get<UserRequestController>(UserRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
