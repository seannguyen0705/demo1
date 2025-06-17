import { Module } from '@nestjs/common';
import { SubscribeSkillService } from './subscribe-skill.service';
import { SubscribeSkillController } from './subscribe-skill.controller';

@Module({
  controllers: [SubscribeSkillController],
  providers: [SubscribeSkillService],
})
export class SubscribeSkillModule {}
