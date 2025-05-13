import { JWT_REFRESH_TOKEN } from '@/utils/constants';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard(JWT_REFRESH_TOKEN) {}
