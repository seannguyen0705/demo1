import { UserRole } from '@/utils/enums';
import { getCandidateMe } from './candidate/query';
import { getAdminMe } from './admin/query';
import { getEmployerMe } from './employer/query';

export const getMe = async (role: UserRole) => {
  if (role === UserRole.ADMIN) {
    return getAdminMe();
  } else if (role === UserRole.EMPLOYER) {
    return getEmployerMe();
  }
  return getCandidateMe();
};
