import { AuthBy, UserRole } from '@/common/enums';

export class ThirdPartyUser {
  fullName: string;
  email: string;
  avatar_url: string;
  authBy: AuthBy;
  role: UserRole;
}
