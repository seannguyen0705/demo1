import { SkillService } from './skill.service';
import { InjectController, InjectRoute } from '@/decorators';
import skillRoutes from './skill.routes';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from './entities/skill.entity';
import { Body, Param, Query, Req } from '@nestjs/common';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { QuerySkillDto } from './dto/query-skill.dto';
import { RequestWithUser } from '@/common/interfaces';
import { UserRole } from '@/common/enums';

@InjectController({ name: skillRoutes.index })
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @InjectRoute(skillRoutes.create)
  public async create(@Body() data: CreateSkillDto): Promise<Skill> {
    const createdSkill = await this.skillService.create(data);

    return createdSkill;
  }

  @InjectRoute(skillRoutes.getAll)
  public async getAll(
    @Query() query: QuerySkillDto,
    @Req() req: RequestWithUser,
  ): Promise<{
    skills: Skill[];
    currentPage: number;
    nextPage: number | null;
    total: number;
  }> {
    if (req.user.role === UserRole.CANDIDATE) {
      return this.skillService.findAll(query, req.user.element.id);
    }
    return this.skillService.findAll(query);
  }

  @InjectRoute(skillRoutes.update)
  public async update(
    @Param('id') id: string,
    @Body() data: UpdateSkillDto,
  ): Promise<Skill> {
    return this.skillService.update(id, data);
  }

  @InjectRoute(skillRoutes.delete)
  public async delete(@Param('id') id: string): Promise<void> {
    return this.skillService.delete(id);
  }
}
