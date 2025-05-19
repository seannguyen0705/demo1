import { ThirdPartyUser } from '@/api/auth/dto/thirPartyUser';
import { ILocalStrategy } from '@/api/auth/strategies';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: ILocalStrategy;
}

export interface RequestWithThirdPartyUser extends Request {
  user: ThirdPartyUser;
}
