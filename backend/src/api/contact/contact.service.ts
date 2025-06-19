import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { QueryContactDto } from './dto/query-contact.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private readonly contactRepository: ContactRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createContact(createContactDto: CreateContactDto) {
    const contact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact);
  }

  async deleteContact(id: string) {
    const contact = await this.contactRepository.findOne({ where: { id }, relations: ['file'] });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    await this.contactRepository.delete(id);
    if (contact.file) {
      await this.cloudinaryService.deleteFile(contact.file.key);
    }
    return {
      message: 'report deleted successfully',
    };
  }

  async getContactById(id: string) {
    const contact = await this.contactRepository.findOne({ where: { id }, relations: ['file'] });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async getContacts(queryContactDto: QueryContactDto) {
    const { keyword, orderBy, order, page, limit } = queryContactDto;
    const query = this.contactRepository
      .createQueryBuilder('contact')
      .select(['contact.id', 'contact.createdAt', 'contact.title', 'contact.email', 'contact.fullName']);
    if (keyword) {
      query.where(
        '(contact.fullName ILIKE :keyword OR contact.email ILIKE :keyword OR contact.title ILIKE :keyword OR contact.content ILIKE :keyword)',
        {
          keyword: `%${keyword}%`,
        },
      );
    }
    if (orderBy) {
      query.orderBy(`contact.${orderBy}`, order);
    }
    query.skip((page - 1) * limit).take(limit);
    const [contacts, total] = await query.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    return page + 1 > numPage
      ? { contacts, currentPage: page, nextPage: null, total }
      : { contacts, currentPage: page, nextPage: page + 1, total };
  }
}
