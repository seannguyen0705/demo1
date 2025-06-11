// import { Employer } from '@/api/employer/entities/employer.entity';
// import { DataSource } from 'typeorm';
// import { faker } from '@faker-js/faker';
// import { Gender } from '@/common/enums';
// import { CreateFileDto } from '@/api/file/dto/create-file.dto';
// import { Company } from '@/api/company/entities/company.entity';
// import { File } from '@/api/file/entities/file.entity';

// const proof: CreateFileDto = {
//   name: 'Chapter 1 Introduction.pdf',
//   url: 'https://res.cloudinary.com/dvpof2yl0/image/upload/v1749527097/proof/ero7yik1pcx2wo1pahse.pdf',
//   key: 'proof/ero7yik1pcx2wo1pahse',
//   format: 'pdf',
// };

// export const seedEmployers = async (dataSource: DataSource, count: number) => {
//   const employerRepository = dataSource.getRepository(Employer);

//   for (const _ of Array.from({ length: count })) {
//     const employer = new Employer();
//     employer.email = faker.internet.email();
//     employer.password = '@12345678';
//     employer.fullName = faker.person.fullName();
//     employer.phoneNumber = faker.phone.number({ style: 'international' });
//     employer.gender = Gender.MALE;
//     employer.bod = faker.date.birthdate();
//     employer.title = faker.lorem.sentence();
//     employer.personal_website = faker.internet.url();
//     const newEmployer = await employerRepository.save(employer);
//     await createNewCompany(dataSource, newEmployer);
//   }
//   console.log(`${count} employers seeded`);
// };

// const createNewCompany = async (dataSource: DataSource, employer: Employer) => {
//   const companyRepository = dataSource.getRepository(Company);
//   const fileRepository = dataSource.getRepository(File);
//   const newFile = new File();
//   newFile.name = proof.name;
//   newFile.url = proof.url;
//   newFile.key = proof.key;
//   newFile.format = proof.format;
//   await fileRepository.save(newFile);
//   const company = new Company();
//   company.name = faker.company.name();
//   company.employer = employer;
//   company.proofId = newFile.id;
//   company.website = faker.internet.url();
//   await companyRepository.save(company);
// };
