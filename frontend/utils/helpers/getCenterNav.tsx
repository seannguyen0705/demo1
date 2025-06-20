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
    [UserRole.CANDIDATE]: [
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
    [UserRole.ADMIN]: [
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
  if (!role) {
    return navs.default;
  }
  return navs[role];
};

export default getCenterNav;
