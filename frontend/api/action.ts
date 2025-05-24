'use server';

import { UserRole } from '@/utils/enums';
import { UpdateCandidateDto } from './candidate/interface';
import { UpdateEmployerDto } from './employer/interface';
import { updateCandidate } from './candidate/action';
import { updateEmployer } from './employer/action';

export const updateUser = async (
  role: UserRole,
  data: UpdateCandidateDto | UpdateEmployerDto,
) => {
  if (role === UserRole.EMPLOYER) {
    return updateEmployer(data);
  }
  return updateCandidate(data);
};
