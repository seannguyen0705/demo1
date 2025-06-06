import { CvService } from './cv.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import CvRoutes from './cv.routes';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import cvRoutes from './cv.routes';
import { Param, Req, UploadedFile } from '@nestjs/common';
import { RequestWithUser } from '@/common/interfaces';
import { DocValidatorPipe } from '@/pipes';
import { IJwtStrategy } from '../auth/strategies';
@InjectController({ name: CvRoutes.index, isCore: true })
export class CvController {
  private readonly folder: string;
  constructor(
    private readonly cvService: CvService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    this.folder = 'cv';
  }

  @InjectRoute(cvRoutes.create)
  async createCv(
    @UploadedFile(new DocValidatorPipe())
    file: Express.Multer.File,
    @ReqUser() user: IJwtStrategy,
  ) {
    return this.cvService.createCv(user.element.id, file);
  }

  @InjectRoute(cvRoutes.update)
  async updateCv(
    @Param('id') id: string,
    @UploadedFile(new DocValidatorPipe())
    file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    return this.cvService.updateCv(id, req.user.element.id, file);
  }

  @InjectRoute(cvRoutes.delete)
  async deleteCv(@Param('id') id: string, @ReqUser() user: IJwtStrategy) {
    return this.cvService.deleteCv(id, user.element.id);
  }

  @InjectRoute(cvRoutes.getMyCv)
  async getMyCv(@ReqUser() user: IJwtStrategy) {
    return this.cvService.getMyCv(user.element.id);
  }
}
