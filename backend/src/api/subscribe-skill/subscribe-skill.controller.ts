import { Controller } from '@nestjs/common';
import { SubscribeSkillService } from './subscribe-skill.service';

@Controller('subscribe-skill')
export class SubscribeSkillController {
  constructor(private readonly subscribeSkillService: SubscribeSkillService) {}
}
