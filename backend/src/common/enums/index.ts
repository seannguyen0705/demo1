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
  LESS_THAN_1_YEAR = '<1 year',
  ONE_YEAR = '1 year',
  TWO_YEAR = '2 years',
  THREE_YEAR = '3 years',
  FOUR_YEAR = '4 years',
  FIVE_YEAR = '5 years',
  SIX_YEAR = '6 years',
  SEVEN_YEAR = '7 năm',
  EIGHT_YEAR = '8 years',
  NINE_YEAR = '9 years',
  TEN_YEAR = '10 years',
  MORE_THAN_10_YEAR = '>10 years',
}

enum JobType {
  OFFICE = 'office',
  HYBRID = 'hybrid',
  REMOTE = 'remote',
  FREELANCE = 'freelance',
}

enum JobStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  HIDDEN = 'hidden',
}

enum OrderByReview {
  CREATED_AT = 'createdAt',
  RATING = 'rating',
}

enum OrderByJob {
  CREATED_AT = 'createdAt',
  EXPIRED_AT = 'expiredAt',
  SALARY = 'salary',
}

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum SalaryType {
  NEGOTIATION = 'negotiation',
  UPTO = 'upto',
  RANGE = 'range',
  ATLEAST = 'atleast',
}

enum JobLevel {
  INTERN = 'intern',
  FRESHER = 'fresher',
  JUNIOR = 'junior',
  SENIOR = 'senior',
  MANAGER = 'manager',
}

enum ApplyJobStatus {
  NEW = 0,
  SEEN = 1,
  INTERVIEWING = 2,
  HIRED = 3,
  REJECTED = 4,
}

enum ApplyJobStatusQuery {
  NEW = 'new',
  SEEN = 'seen',
  INTERVIEWING = 'interviewing',
  HIRED = 'hired',
  REJECTED = 'rejected',
}

enum OrderByApplyJob {
  CREATED_AT = 'createdAt',
  STATUS = 'status',
}

enum OrderByUser {
  CREATED_AT = 'createdAt',
}

enum OrderByContact {
  CREATED_AT = 'createdAt',
}

export {
  Gender,
  UserRole,
  AuthBy,
  UserStatus,
  SkillYear,
  JobType,
  JobStatus,
  OrderByJob,
  OrderByReview,
  Order,
  SalaryType,
  JobLevel,
  ApplyJobStatus,
  OrderByApplyJob,
  ApplyJobStatusQuery,
  OrderByUser,
  OrderByContact,
};
