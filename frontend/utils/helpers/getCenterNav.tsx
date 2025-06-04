import { UserRole } from '../enums';

const getCenterNav = (role?: UserRole) => {
  const navs = {
    [UserRole.EMPLOYER]: [
      {
        name: 'Trang chủ',
        href: '/',
      },
      {
        name: 'Về chúng tôi',
        href: '/about',
      },
      {
        name: 'Liên hệ',
        href: '/contact',
      },
    ],
    auth: [
      {
        name: 'Trang chủ',
        href: '/',
      },
      {
        name: 'Việc làm',
        href: '/job',
      },
      {
        name: 'Về chúng tôi',
        href: '/about',
      },
      {
        name: 'Liên hệ',
        href: '/contact',
      },
    ],
    default: [
      {
        name: 'Trang chủ',
        href: '/',
      },
      {
        name: 'Việc làm',
        href: '/job',
      },
      {
        name: 'Về chúng tôi',
        href: '/about',
      },
      {
        name: 'Liên hệ',
        href: '/contact',
      },
      {
        name: 'Tuyển dụng',
        href: '/recruitment',
      },
    ],
  };
  if (role === UserRole.EMPLOYER) {
    return navs[UserRole.EMPLOYER];
  }
  if (role) {
    return navs.auth;
  }
  return navs.default;
};

export default getCenterNav;
