import { UserStatus } from '../enums';

export const mapEnumStatusUser = (status: UserStatus) => {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'Hoạt động';
    case UserStatus.INACTIVE:
      return 'Chưa kích hoạt';
    case UserStatus.BANNED:
      return 'Khóa';
  }
};
