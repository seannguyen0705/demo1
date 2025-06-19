import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

export class ContactRepository extends Repository<Contact> {}
