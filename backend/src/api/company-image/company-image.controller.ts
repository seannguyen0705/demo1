import { CompanyImageService } from './company-image.service';
import { InjectController, InjectRoute } from '@/decorators';
import companyImageRoutes from './company-image.routes';
import { Param, UploadedFile } from '@nestjs/common';
import { RequestWithUser } from '@/common/interfaces';
import { Req } from '@nestjs/common';
import { ImageValidatorPipe } from '@/pipes';
@InjectController({ name: companyImageRoutes.index, isCore: true })
export class CompanyImageController {
  constructor(private readonly companyImageService: CompanyImageService) {}

  @InjectRoute(companyImageRoutes.create)
  async createCompanyImage(
    @UploadedFile(new ImageValidatorPipe())
    file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    return this.companyImageService.createCompanyImage(req.user.element.id, file);
  }

  @InjectRoute(companyImageRoutes.update)
  async updateCompanyImage(
    @Param('id') id: string,
    @UploadedFile(new ImageValidatorPipe())
    file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    return this.companyImageService.updateCompanyImage(id, req.user.element.id, file);
  }

  @InjectRoute(companyImageRoutes.delete)
  async deleteCompanyImage(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.companyImageService.deleteCompanyImage(id, req.user.element.id);
  }

  @InjectRoute(companyImageRoutes.getCompanyImage)
  async getCompanyImage(@Param('companyId') companyId: string) {
    const companyImage = await this.companyImageService.getCompanyImage(companyId);
    return companyImage;
  }
}
