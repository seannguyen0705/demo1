import { QueryRunner } from 'typeorm';
import { Candidate } from '@/api/candidate/entities/candidate.entity';
import { faker } from '@faker-js/faker';
import { Gender, UserStatus } from '@/common/enums';
import { BATCH_SIZE } from '@/utils/constants';

export const seedCandidates = async (queryRunner: QueryRunner, count = 10) => {
  const candidateRepository = queryRunner.manager.getRepository(Candidate);
  let batch: Candidate[] = [];

  for (const _ of Array.from({ length: count })) {
    const candidate = new Candidate();
    candidate.email = faker.internet.email();
    candidate.password = '@12345678';
    candidate.fullName = faker.person.fullName();
    candidate.phoneNumber = faker.helpers.fromRegExp(/0[0-9]{9}/);
    candidate.gender = faker.helpers.arrayElement(Object.values(Gender));
    candidate.bod = faker.date.birthdate();
    candidate.title = faker.lorem.sentence();
    candidate.address = faker.location.streetAddress();
    candidate.personal_website = faker.internet.url();
    candidate.introduction = faker.lorem.paragraph();
    candidate.status = UserStatus.ACTIVE;
    candidate.createdAt = faker.date.between({
      from: new Date(Date.now() - 6 * 30 * 86400000),
      to: new Date(Date.now()),
    });

    const existingCandidate = await candidateRepository.findOneBy([
      { email: candidate.email },
      { phoneNumber: candidate.phoneNumber },
    ]);
    if (existingCandidate) {
      continue;
    }
    batch.push(candidate);
    if (batch.length === BATCH_SIZE) {
      await candidateRepository.save(batch);
      batch = [];
    }
  }
  if (batch.length > 0) {
    await candidateRepository.save(batch);
  }
};
