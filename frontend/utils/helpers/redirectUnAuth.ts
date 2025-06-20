import { UserRole } from '../enums';

export default function redirectUnAuth(role: UserRole | undefined) {
  if (role === UserRole.ADMIN) {
    return '/admin/sign-in';
  } else if (role === UserRole.EMPLOYER) {
    return '/recruitment/sign-in';
  }
  return '/sign-in';
}
