import { Employer } from '@/api/employer/entities/employer.entity';
import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Gender } from '@/common/enums';
import { CreateFileDto } from '@/api/file/dto/create-file.dto';
import { Company } from '@/api/company/entities/company.entity';
import { File } from '@/api/file/entities/file.entity';
import { Address } from '@/api/address/entities/address.entity';
import { Province } from '@/api/province/entities/province.entity';

const proof: CreateFileDto = {
  name: '1_Introduction to Software Testing.pdf',
  url: 'https://res.cloudinary.com/dvpof2yl0/image/upload/v1749625921/proof/yivvswwmwzlnv5zqfkip.pdf',
  key: 'proof/yivvswwmwzlnv5zqfkip',
  format: 'application/pdf',
};

const BATCH_SIZE = 100;
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
    if (existingEmployer) {
      continue;
    }
    const existingCompany = await companyRepository.findOneBy({ name: companyName });
    if (existingCompany) {
      continue;
    }
    const employer = new Employer();
    employer.email = email;
    employer.password = '@12345678';
    employer.fullName = faker.person.fullName();
    employer.phoneNumber = phoneNumber;
    employer.gender = Gender.MALE;
    employer.bod = faker.date.birthdate();
    employer.title = faker.lorem.sentence();
    employer.personal_website = faker.internet.url();

    const newEmployer = employerRepository.create(employer);
    const addresses = await createAddresses(queryRunner, Math.floor(Math.random() * 10) + 1);
    const company = await createCompany(queryRunner, newEmployer, addresses, companyName);

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
