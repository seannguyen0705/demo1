import { Test, TestingModule } from '@nestjs/testing';
import { ApplyJobService } from '../apply-job/apply-job.service';
import { CandidateService } from '../candidate/candidate.service';
import { CompanyService } from '../company/company.service';
import { JobService } from '../job/job.service';
import { StaticsticsController } from './staticstics.controller';
import { StaticsticsService } from './staticstics.service';
import { EmployerService } from '../employer/employer.service';
describe('StaticsticsController', () => {
  let controller: StaticsticsController;
  let staticsticsService: StaticsticsService;
  let jobService: JobService;
  let companyService: CompanyService;
  let candidateService: CandidateService;
  let applyJobService: ApplyJobService;
  let employerService: EmployerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaticsticsController],
      providers: [
        {
          provide: StaticsticsService,
          useValue: {
            getStaticstics: jest.fn(),
          },
        },
        {
          provide: JobService,
          useValue: {
            countAllJobs: jest.fn(),
            countJobIn6MonthsAgo: jest.fn(),
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
            countCandidateIn6MonthsAgo: jest.fn(),
          },
        },
        {
          provide: ApplyJobService,
          useValue: {
            countAllApplyJobs: jest.fn(),
            countApplyJobIn6MonthsAgo: jest.fn(),
          },
        },
        {
          provide: EmployerService,
          useValue: {
            countEmployerIn6MonthsAgo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StaticsticsController>(StaticsticsController);
    staticsticsService = module.get<StaticsticsService>(StaticsticsService);
    jobService = module.get<JobService>(JobService);
    companyService = module.get<CompanyService>(CompanyService);
    candidateService = module.get<CandidateService>(CandidateService);
    applyJobService = module.get<ApplyJobService>(ApplyJobService);
    employerService = module.get<EmployerService>(EmployerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the correct statistics', async () => {
    const mockJobCount = 10;
    const mockCompanyCount = 5;
    const mockCandidateCount = 3;

    (staticsticsService.getStaticstics as jest.Mock).mockResolvedValue({
      countJobs: mockJobCount,
      countCompanies: mockCompanyCount,
      countCandidates: mockCandidateCount,
    });

    const result = await controller.getStaticstics();

    expect(result).toEqual({
      countJobs: mockJobCount,
      countCompanies: mockCompanyCount,
      countCandidates: mockCandidateCount,
    });
  });

  it('should return the correct statistics count in 6 months ago', async () => {
    (jobService.countJobIn6MonthsAgo as jest.Mock).mockResolvedValue([
      { date: new Date('2024-01-01'), count: 10 },
      { date: new Date('2024-02-01'), count: 5 },
      { date: new Date('2024-03-01'), count: 3 },
      { date: new Date('2024-04-01'), count: 2 },
      { date: new Date('2024-05-01'), count: 1 },
      { date: new Date('2024-06-01'), count: 1 },
    ]);

    (employerService.countEmployerIn6MonthsAgo as jest.Mock).mockResolvedValue([
      { date: new Date('2024-01-01'), count: 10 },
      { date: new Date('2024-02-01'), count: 5 },
      { date: new Date('2024-03-01'), count: 3 },
      { date: new Date('2024-04-01'), count: 2 },
      { date: new Date('2024-05-01'), count: 1 },
      { date: new Date('2024-06-01'), count: 1 },
    ]);

    (candidateService.countCandidateIn6MonthsAgo as jest.Mock).mockResolvedValue([
      { date: new Date('2024-01-01'), count: 10 },
      { date: new Date('2024-02-01'), count: 5 },
      { date: new Date('2024-03-01'), count: 3 },
      { date: new Date('2024-04-01'), count: 2 },
      { date: new Date('2024-05-01'), count: 1 },
    ]);

    (applyJobService.countApplyJobIn6MonthsAgo as jest.Mock).mockResolvedValue([
      { date: new Date('2024-01-01'), count: 10 },
      { date: new Date('2024-02-01'), count: 5 },
      { date: new Date('2024-03-01'), count: 3 },
      { date: new Date('2024-04-01'), count: 2 },
      { date: new Date('2024-05-01'), count: 1 },
    ]);

    const result = await controller.staticsticsCountIn6MonthsAgo();

    expect(result).toEqual({
      jobs: [
        { date: new Date('2024-01-01'), count: 10 },
        { date: new Date('2024-02-01'), count: 5 },
        { date: new Date('2024-03-01'), count: 3 },
        { date: new Date('2024-04-01'), count: 2 },
        { date: new Date('2024-05-01'), count: 1 },
        { date: new Date('2024-06-01'), count: 1 },
      ],
      employers: [
        { date: new Date('2024-01-01'), count: 10 },
        { date: new Date('2024-02-01'), count: 5 },
        { date: new Date('2024-03-01'), count: 3 },
        { date: new Date('2024-04-01'), count: 2 },
        { date: new Date('2024-05-01'), count: 1 },
        { date: new Date('2024-06-01'), count: 1 },
      ],
      candidates: [
        { date: new Date('2024-01-01'), count: 10 },
        { date: new Date('2024-02-01'), count: 5 },
        { date: new Date('2024-03-01'), count: 3 },
        { date: new Date('2024-04-01'), count: 2 },
        { date: new Date('2024-05-01'), count: 1 },
      ],
      applyJobs: [
        { date: new Date('2024-01-01'), count: 10 },
        { date: new Date('2024-02-01'), count: 5 },
        { date: new Date('2024-03-01'), count: 3 },
        { date: new Date('2024-04-01'), count: 2 },
        { date: new Date('2024-05-01'), count: 1 },
      ],
    });
  });
});
