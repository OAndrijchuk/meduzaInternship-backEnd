import { Test, TestingModule } from '@nestjs/testing';
import { CompanyInviteService } from './company-invite.service';

describe('CompanyInviteService', () => {
  let service: CompanyInviteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyInviteService],
    }).compile();

    service = module.get<CompanyInviteService>(CompanyInviteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
