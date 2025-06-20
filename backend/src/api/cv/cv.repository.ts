import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';

export class CvExpository extends Repository<Cv> {}
