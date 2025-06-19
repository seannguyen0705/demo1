import * as Joi from 'joi';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from '@/config';
import { AppController } from './app.controller';

import { AuthModule } from '@/api/auth/auth.module';
import { TokenModule } from '@/api/token/token.module';
import { AdminModule } from '@/api/admin/admin.module';
import { DatabaseModule } from '@/database/database.module';
import { CandidateModule } from '@/api/candidate/candidate.module';
import LogsMiddleware from '@/middleware/log.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { FileModule } from '@/api/file/file.module';
import { GithubModule } from '@/api/github/github.module';
import { GoogleModule } from '@/api/google/google.module';
import { LinkedinModule } from '@/api/linkedin/linkedin.module';
import { CompanyModule } from '@/api/company/company.module';
import { CloudinaryModule } from '@/api/cloudinary/cloudinary.module';
import { EmailModule } from '@/api/email/email.module';
import { EmployerModule } from '@/api/employer/employer.module';
import { ExperienceModule } from '@/api/experience/experience.module';
import { SkillModule } from '@/api/skill/skill.module';
import { CandidateSkillModule } from '@/api/candidate-skill/candidate-skill.module';
import { CvModule } from '@/api/cv/cv.module';
import { ReviewModule } from '@/api/review/review.module';
import { JobModule } from '@/api/job/job.module';
import { JobSkillModule } from '@/api/job-skill/job-skill.module';
import { CompanyImageModule } from '@/api/company-image/company-image.module';
import { AddressModule } from '@/api/address/address.module';
import { ProvinceModule } from '@/api/province/province.module';
import { CompanyAddressModule } from '@/api/company-address/company-address.module';
import { JobAddressModule } from '@/api/job-address/job-address.module';
import { StaticsticsModule } from '@/api/staticstics/staticstics.module';
import { ApplyJobModule } from '@/api/apply-job/apply-job.module';
import { SaveJobModule } from '@/api/save-job/save-job.module';
import { SubscribeSkillModule } from '@/api/subscribe-skill/subscribe-skill.module';
import { SentryModule } from '@sentry/nestjs/setup';

const EnvSchema = {
  PORT: Joi.number(),
  NODE_ENV: Joi.string(),
  DB_TYPE: Joi.string().required(),
  DB_SSL: Joi.boolean().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  GITHUB_CLIENT_ID: Joi.string().required(),
  GITHUB_CLIENT_SECRET: Joi.string().required(),
  GITHUB_CALLBACK_URL: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
  LINKEDIN_CLIENT_ID: Joi.string().required(),
  LINKEDIN_CLIENT_SECRET: Joi.string().required(),
  LINKEDIN_CALLBACK_URL: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  MAIL_USERNAME: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
};

@Module({
  imports: [
    SentryModule.forRoot(),
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object().keys(EnvSchema),
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    TokenModule,
    AdminModule,
    CandidateModule,
    EmployerModule,
    ScheduleModule.forRoot(),
    FileModule,
    GithubModule,
    GoogleModule,
    LinkedinModule,
    CompanyModule,
    CloudinaryModule,
    CompanyModule,
    EmployerModule,
    EmailModule,
    ExperienceModule,
    SkillModule,
    CandidateSkillModule,
    CvModule,
    ReviewModule,
    CompanyModule,
    JobModule,
    JobSkillModule,
    CompanyImageModule,
    JobModule,
    AddressModule,
    ProvinceModule,
    JobAddressModule,
    StaticsticsModule,
    ApplyJobModule,
    SaveJobModule,
    CompanyAddressModule,
    SubscribeSkillModule,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
