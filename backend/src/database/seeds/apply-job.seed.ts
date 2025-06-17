import { ApplyJob } from '@/api/apply-job/entities/apply-job.entity';
import { Candidate } from '@/api/candidate/entities/candidate.entity';
import { Company } from '@/api/company/entities/company.entity';
import { CreateFileDto } from '@/api/file/dto/create-file.dto';
import { Job } from '@/api/job/entities/job.entity';
import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { File } from '@/api/file/entities/file.entity';
import { ApplyJobStatus } from '@/common/enums';
import { BATCH_SIZE } from '@/utils/constants';
import { enumh } from '@/utils/helpers';

const createFile: CreateFileDto = {
  name: '1_Introduction to Software Testing.pdf',
  url: 'https://res.cloudinary.com/dvpof2yl0/image/upload/v1749625921/proof/yivvswwmwzlnv5zqfkip.pdf',
  key: 'proof/yivvswwmwzlnv5zqfkip',
  format: 'application/pdf',
};

export const seedApplyJobs = async (queryRunner: QueryRunner, count: number) => {
  const applyJobRepository = queryRunner.manager.getRepository(ApplyJob);
  const candidateIds = await queryRunner.manager
    .createQueryBuilder(Candidate, 'candidate')
    .select('candidate.id')
    .getMany();

  const jobIds = await queryRunner.manager.createQueryBuilder(Job, 'job').select('job.id').getMany();

  const fileRepository = queryRunner.manager.getRepository(File);

  let batch: ApplyJob[] = [];

  for (const _ of Array.from({ length: count })) {
    const file = fileRepository.create(createFile);
    const jobId = faker.helpers.arrayElement(jobIds).id;
    const candidateId = faker.helpers.arrayElement(candidateIds).id;
    const existingApplyJob = await applyJobRepository.findOne({ where: { jobId, candidateId } });
    if (
      existingApplyJob ||
      batch.some((applyJob) => applyJob.jobId === jobId && applyJob.candidateId === candidateId)
    ) {
      continue;
    }
    const applyJob = new ApplyJob();
    applyJob.jobId = jobId;
    applyJob.createdAt = faker.date.between({
      from: new Date(Date.now() - 6 * 30 * 86400000),
      to: new Date(Date.now()),
    });
    applyJob.candidateId = candidateId;
    applyJob.fileId = file.id;
    applyJob.file = file;
    applyJob.fullName = faker.person.fullName();
    applyJob.phoneNumber = faker.helpers.fromRegExp(/0[0-9]{9}/);
    applyJob.expectedAddress = faker.location.streetAddress();
    applyJob.message = faker.lorem.paragraph();
    applyJob.status = faker.helpers.arrayElement([
      ApplyJobStatus.NEW,
      ApplyJobStatus.REJECTED,
      ApplyJobStatus.SEEN,
      ApplyJobStatus.INTERVIEWING,
      ApplyJobStatus.HIRED,
    ]);
    batch.push(applyJob);
    if (batch.length === BATCH_SIZE) {
      await applyJobRepository.save(batch);
      batch = [];
    }
  }
  if (batch.length > 0) {
    await applyJobRepository.save(batch);
  }
  console.log(`${count} apply jobs seeded`);
};
