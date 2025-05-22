enum Gender {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  OTHER = 'Khác',
}

enum UserRole {
  CANDIDATE = 'candidate',
  ADMIN = 'admin',
  EMPLOYER = 'employer',
}

enum UserStatus {
  BANNED = 'banned',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

enum AuthBy {
  LOCAL = 'local',
  GITHUB = 'github',
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
}

enum SkillYear {
  LESS_THAN_1_YEAR = '<1 năm',
  ONE_YEAR = '1 năm',
  TWO_YEAR = '2 năm',
  THREE_YEAR = '3 năm',
  FOUR_YEAR = '4 năm',
  FIVE_YEAR = '5 năm',
  SIX_YEAR = '6 năm',
  SEVEN_YEAR = '7 năm',
  EIGHT_YEAR = '8 năm',
  NINE_YEAR = '9 năm',
  TEN_YEAR = '10 năm',
  MORE_THAN_10_YEAR = '>10 năm',
}

export { Gender, UserRole, AuthBy, UserStatus, SkillYear };
