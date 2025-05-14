import { Entity } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';

@Entity('companies')
export class Company extends BaseEntity {}
