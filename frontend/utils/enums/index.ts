enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
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

export { Gender, UserRole, AuthBy, UserStatus };
