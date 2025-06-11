import { QueryRunner } from 'typeorm';
import { Candidate } from '@/api/candidate/entities/candidate.entity';
import { faker } from '@faker-js/faker';
import { Gender } from '@/common/enums';

export const seedCandidates = async (queryRunner: QueryRunner, count: number = 10) => {
  const candidateRepository = queryRunner.manager.getRepository(Candidate);

  for (const _ of Array.from({ length: count })) {
    const candidate = new Candidate();
    candidate.email = faker.internet.email();
    candidate.password = '@12345678';
    candidate.fullName = faker.person.fullName();
    candidate.phoneNumber = faker.phone.number({ style: 'international' });
    candidate.gender = Gender.MALE;
    candidate.bod = faker.date.birthdate();
    candidate.title = faker.lorem.sentence();
    candidate.address = faker.location.streetAddress();
    candidate.personal_website = faker.internet.url();
    candidate.introduction = faker.lorem.paragraph();

    const existingCandidate = await candidateRepository.findOneBy([
      { email: candidate.email },
      { phoneNumber: candidate.phoneNumber },
    ]);
    if (existingCandidate) {
      continue;
    }
    await candidateRepository.save(candidate);
  }
};
