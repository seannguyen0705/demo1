import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from '../candidate/candidate.service';
import { CompanyService } from '../company/company.service';
import { JobService } from '../job/job.service';
import { StaticsticsService } from './staticstics.service';
import { ApplyJobService } from '../apply-job/apply-job.service';
describe('StaticsticsService', () => {
  let service: StaticsticsService;
  let jobService: JobService;
  let companyService: CompanyService;
  let candidateService: CandidateService;
  let applyJobService: ApplyJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaticsticsService,
        {
          provide: JobService,
          useValue: {
            countAllJobs: jest.fn(),
          },
        },
        {
          provide: CompanyService,
          useValue: {
            countAllCompanies: jest.fn(),
          },
        },
        {
          provide: CandidateService,
          useValue: {
            countAllCandidates: jest.fn(),
          },
        },
        {
          provide: ApplyJobService,
          useValue: {
            countApplyJobs: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StaticsticsService>(StaticsticsService);
    jobService = module.get<JobService>(JobService);
    companyService = module.get<CompanyService>(CompanyService);
    candidateService = module.get<CandidateService>(CandidateService);
    applyJobService = module.get<ApplyJobService>(ApplyJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct statistics', async () => {
    const mockJobCount = 10;
    const mockCompanyCount = 5;
    const mockCandidateCount = 3;

    (jobService.countAllJobs as jest.Mock).mockResolvedValue(mockJobCount);
    (companyService.countAllCompanies as jest.Mock).mockResolvedValue(mockCompanyCount);
    (candidateService.countAllCandidates as jest.Mock).mockResolvedValue(mockCandidateCount);

    const result = await service.getStaticstics();

    expect(result).toEqual({
      countJobs: mockJobCount,
      countCompanies: mockCompanyCount,
      countCandidates: mockCandidateCount,
    });
  });
});
