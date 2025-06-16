import { Employer } from '@/api/employer/entities/employer.entity';
import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Gender, JobLevel, JobStatus, JobType, SalaryType, UserStatus } from '@/common/enums';
import { CreateFileDto } from '@/api/file/dto/create-file.dto';
import { Company } from '@/api/company/entities/company.entity';
import { File } from '@/api/file/entities/file.entity';
import { Address } from '@/api/address/entities/address.entity';
import { Province } from '@/api/province/entities/province.entity';
import { Job } from '@/api/job/entities/job.entity';
import { Skill } from '@/api/skill/entities/skill.entity';
import { BATCH_SIZE } from '@/utils/constants';

const proof: CreateFileDto = {
  name: '1_Introduction to Software Testing.pdf',
  url: 'https://res.cloudinary.com/dvpof2yl0/image/upload/v1749625921/proof/yivvswwmwzlnv5zqfkip.pdf',
  key: 'proof/yivvswwmwzlnv5zqfkip',
  format: 'application/pdf',
};

export const seedEmployers = async (queryRunner: QueryRunner, count: number) => {
  const employerRepository = queryRunner.manager.getRepository(Employer);
  const companyRepository = queryRunner.manager.getRepository(Company);
  let email, phoneNumber, companyName;
  let batch: Employer[] = [];

  for (const _ of Array.from({ length: count })) {
    email = faker.internet.email();
    phoneNumber = faker.helpers.fromRegExp(/0[0-9]{9}/);
    companyName = faker.company.name();

    const existingEmployer = await employerRepository.findOneBy([{ email }, { phoneNumber }]);
    if (
      existingEmployer ||
      batch.some((employer) => employer.email === email || employer.phoneNumber === phoneNumber)
    ) {
      continue;
    }
    const existingCompany = await companyRepository.findOneBy({ name: companyName });
    if (existingCompany || batch.some((employer) => employer.company?.name === companyName)) {
      continue;
    }
    const createdAt = faker.date.between({
      from: new Date(Date.now() - 6 * 30 * 86400000),
      to: new Date(Date.now()),
    });
    const employer = new Employer();
    employer.email = email;
    employer.password = '@12345678';
    employer.fullName = faker.person.fullName();
    employer.phoneNumber = phoneNumber;
    employer.gender = Gender.MALE;
    employer.bod = faker.date.birthdate();
    employer.title = faker.lorem.sentence();
    employer.personal_website = faker.internet.url();
    employer.status = UserStatus.ACTIVE;
    employer.createdAt = createdAt;

    const newEmployer = employerRepository.create(employer);
    const addresses = await createAddresses(queryRunner, Math.floor(Math.random() * 5) + 1);
    const company = await createCompany(queryRunner, newEmployer, addresses, companyName);
    company.createdAt = createdAt;
    const jobs = await createJobs(company, addresses, queryRunner, Math.floor(Math.random() * 10) + 1);
    company.jobs = jobs;

    newEmployer.company = company;
    batch.push(newEmployer);
    if (batch.length === BATCH_SIZE) {
      await employerRepository.save(batch);
      batch = [];
    }
  }
  if (batch.length > 0) {
    await employerRepository.save(batch);
  }
  console.log(`${count} employers seeded`);
};

const createCompany = async (
  queryRunner: QueryRunner,
  employer: Employer,
  addresses: Address[],
  companyName: string,
) => {
  const companyRepository = queryRunner.manager.getRepository(Company);
  const fileRepository = queryRunner.manager.getRepository(File);
  const file = new File();
  file.name = proof.name;
  file.url = proof.url;
  file.key = proof.key;
  file.format = proof.format;
  const newFile = fileRepository.create(file);
  const company = new Company();
  company.name = companyName;
  company.employer = employer;
  company.industry = faker.lorem.sentence({ min: 3, max: 5 });
  company.proof = newFile;
  company.website = faker.internet.url();
  company.addresses = addresses;
  return companyRepository.create(company);
};

const createAddresses = async (queryRunner: QueryRunner, number: number): Promise<Address[]> => {
  const provinceRepository = queryRunner.manager.getRepository(Province);
  const provinces = await provinceRepository.find();
  const addressRepository = queryRunner.manager.getRepository(Address);
  const addresses: Address[] = [];
  for (const _ of Array.from({ length: number })) {
    const newAddress = new Address();
    newAddress.detail = faker.location.streetAddress();
    newAddress.provinceId = provinces[faker.number.int({ min: 0, max: provinces.length - 1 })].id;
    addresses.push(newAddress);
  }
  return addressRepository.create(addresses);
};

const createJobs = async (
  company: Company,
  addresses: Address[],
  queryRunner: QueryRunner,
  count: number,
): Promise<Job[]> => {
  const jobRepository = queryRunner.manager.getRepository(Job);
  const skills = await queryRunner.manager.getRepository(Skill).find();
  const jobs: Job[] = [];
  for (const _ of Array.from({ length: count })) {
    const job = new Job();
    job.title = faker.lorem.sentence();
    if (jobs.some((item) => item.title === job.title)) {
      continue;
    }
    job.salaryType = faker.helpers.arrayElement(Object.values(SalaryType));
    job.salaryMin = faker.number.int({ min: 5000000, max: 10000000 });
    job.salaryMax = faker.number.int({ min: 10000000, max: 20000000 });
    job.jobType = faker.helpers.arrayElement(Object.values(JobType));
    job.jobLevel = faker.helpers.arrayElement(Object.values(JobLevel));
    job.jobExpertise = faker.lorem.sentence({ min: 3, max: 5 });
    job.jobDomain = faker.lorem.sentence({ min: 3, max: 5 });
    job.description = faker.lorem.paragraph({ min: 30, max: 50 });
    job.requirement = faker.lorem.paragraph({ min: 30, max: 50 });
    job.benefit = faker.lorem.paragraph({ min: 30, max: 50 });
    job.status = JobStatus.PUBLISHED;
    job.companyId = company.id;
    job.createdAt = faker.date.between({
      from: new Date(Date.now() - 6 * 30 * 86400000),
      to: new Date(Date.now()),
    });
    job.addresses = faker.helpers.arrayElements(addresses);
    job.skills = faker.helpers.arrayElements(skills, { min: 1, max: 10 });
    // job expired between yesterday and 60 days from now
    job.expiredAt = faker.date.between({
      from: new Date(Date.now() - 86400000),
      to: new Date(Date.now() + 60 * 86400000),
    });
    jobs.push(job);
  }
  return jobRepository.create(jobs);
};
