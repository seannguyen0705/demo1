import { Body, Param, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { InjectController, InjectRoute } from '@/decorators';
import { CreateContactDto } from './dto/create-contact.dto';
import { QueryContactDto } from './dto/query-contact.dto';

import contactRoute from './contact.route';
@InjectController({ name: contactRoute.index })
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @InjectRoute(contactRoute.createContact)
  async createContact(@Body() createContactDto: CreateContactDto) {
    return this.contactService.createContact(createContactDto);
  }

  @InjectRoute(contactRoute.getContacts)
  async getContacts(@Query() queryContactDto: QueryContactDto) {
    return this.contactService.getContacts(queryContactDto);
  }

  @InjectRoute(contactRoute.deleteContact)
  async deleteContact(@Param('id') id: string) {
    return this.contactService.deleteContact(id);
  }

  @InjectRoute(contactRoute.getContactById)
  async getContactById(@Param('id') id: string) {
    return this.contactService.getContactById(id);
  }
}
