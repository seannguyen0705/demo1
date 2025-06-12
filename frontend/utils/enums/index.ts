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

enum SkillYear {
  LESS_THAN_1_YEAR = '<1 year',
  ONE_YEAR = '1 year',
  TWO_YEAR = '2 years',
  THREE_YEAR = '3 years',
  FOUR_YEAR = '4 years',
  FIVE_YEAR = '5 years',
  SIX_YEAR = '6 years',
  SEVEN_YEAR = '7 years',
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

enum OrderByApplyJob {
  CREATED_AT = 'createdAt',
}

enum ApplyJobStatus {
  NEW = 'new',
  SEEN = 'seen',
  INTERVIEWING = 'interviewing',
  HIRED = 'hired',
  REJECTED = 'rejected',
}

enum ApplyJobStatusDB {
  NEW = 0,
  SEEN = 1,
  INTERVIEWING = 2,
  HIRED = 3,
  REJECTED = 4,
}

export {
  Gender,
  UserRole,
  AuthBy,
  UserStatus,
  SkillYear,
  JobType,
  JobStatus,
  OrderByReview,
  Order,
  SalaryType,
  JobLevel,
  ApplyJobStatus,
  OrderByApplyJob,
  ApplyJobStatusDB,
  OrderByJob,
};
