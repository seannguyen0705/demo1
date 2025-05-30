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

enum AuthBy {
  LOCAL = 'local',
  GITHUB = 'github',
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
}

enum UserStatus {
  BANNED = 'banned',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
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

enum JobType {
  OFFICE = 'Tại văn phòng',
  HYBRID = 'Linh hoạt',
  REMOTE = 'Từ xa',
  FREELANCE = 'Freelance',
}

enum JobStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  HIDDEN = 'hidden',
}

enum SortJob {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  SALARY_ASC = 'salary_asc',
  SALARY_DESC = 'salary_desc',
}

enum OrderByReview {
  CREATED_AT = 'createdAt',
  RATING = 'rating',
}

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export { Gender, UserRole, AuthBy, UserStatus, SkillYear, JobType, JobStatus, SortJob, OrderByReview, Order };
