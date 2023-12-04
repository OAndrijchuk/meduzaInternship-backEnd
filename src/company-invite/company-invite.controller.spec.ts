import { Test, TestingModule } from '@nestjs/testing';
import { CompanyInviteController } from './company-invite.controller';
import { CompanyInviteService } from './company-invite.service';

describe('CompanyInviteController', () => {
  let controller: CompanyInviteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyInviteController],
      providers: [CompanyInviteService],
    }).compile();

    controller = module.get<CompanyInviteController>(CompanyInviteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
