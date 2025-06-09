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

enum JobType {
  OFFICE = 'Tại văn phòng',
  HYBRID = 'Linh hoạt',
  REMOTE = 'Từ xa',
  FREELANCE = 'Freelance',
}

enum JobStatus {
  PUBLISHED = 'Đã đăng',
  DRAFT = 'Bản nháp',
  HIDDEN = 'Ẩn',
}

enum SortJob {
  NEWEST = 'Mới nhất',
  OLDEST = 'Cũ nhất',
  SALARY_ASC = 'Lương tăng dần',
  SALARY_DESC = 'Lương giảm dần',
}

enum OrderByReview {
  CREATED_AT = 'createdAt',
  RATING = 'rating',
}

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum SalaryType {
  NEGOTIATION = 'Thương lượng',
  UPTO = 'Lên đến',
  RANGE = 'Khoảng',
  ATLEAST = 'Tối thiểu',
}

enum JobLevel {
  INTERN = 'Intern',
  FRESHER = 'Fresher',
  JUNIOR = 'Junior',
  SENIOR = 'Senior',
  MANAGER = 'Manager',
}

enum OrderByApplyJob {
  CREATED_AT = 'createdAt',
}

enum ApplyJobStatus {
  NEW = 'Mới',
  SEEN = 'Đã xem',
  INTERVIEWING = 'Phỏng vấn',
  HIRED = 'Đã nhận',
  REJECTED = 'Từ chối',
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
  SortJob,
  OrderByReview,
  Order,
  SalaryType,
  JobLevel,
  ApplyJobStatus,
  OrderByApplyJob,
  ApplyJobStatusDB,
};
