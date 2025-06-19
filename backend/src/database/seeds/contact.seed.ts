import { Contact } from '@/api/contact/entities/contact.entity';
import { CreateFileDto } from '@/api/file/dto/create-file.dto';
import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { BATCH_SIZE } from '@/utils/constants';
import { File } from '@/api/file/entities/file.entity';

const proof: CreateFileDto = {
  name: '1_Introduction to Software Testing.pdf',
  url: 'https://res.cloudinary.com/dvpof2yl0/image/upload/v1749625921/proof/yivvswwmwzlnv5zqfkip.pdf',
  key: 'proof/yivvswwmwzlnv5zqfkip',
  format: 'application/pdf',
};
export const seedContacts = async (queryRunner: QueryRunner, count: number) => {
  const contactRepository = queryRunner.manager.getRepository(Contact);

  let batch: Contact[] = [];

  for (const _ of Array.from({ length: count })) {
    const newFile = await queryRunner.manager.getRepository(File).create(proof);
    const contact = new Contact();
    contact.fullName = faker.person.fullName();
    contact.email = faker.internet.email();
    contact.title = faker.lorem.sentence();
    contact.content = faker.lorem.paragraph();
    contact.fileId = newFile.id;
    contact.createdAt = faker.date.between({
      from: new Date(Date.now() - 6 * 30 * 86400000),
      to: new Date(Date.now()),
    });
    contact.file = newFile;

    batch.push(contact);
    if (batch.length === BATCH_SIZE) {
      await contactRepository.save(batch);
      batch = [];
    }
  }
  if (batch.length > 0) {
    await contactRepository.save(batch);
  }
};
