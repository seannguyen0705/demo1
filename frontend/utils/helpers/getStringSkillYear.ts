import { SkillYear } from '../enums';

export default function getStringSkillYear(skillYear: SkillYear) {
  switch (skillYear) {
    case SkillYear.LESS_THAN_1_YEAR:
      return 'Dưới 1 năm';
    case SkillYear.ONE_YEAR:
      return '1 năm';
    case SkillYear.TWO_YEAR:
      return '2 năm';
    case SkillYear.THREE_YEAR:
      return '3 năm';
    case SkillYear.FOUR_YEAR:
      return '4 năm';
    case SkillYear.FIVE_YEAR:
      return '5 năm';
    case SkillYear.SIX_YEAR:
      return '6 năm';
    case SkillYear.SEVEN_YEAR:
      return '7 năm';
    case SkillYear.EIGHT_YEAR:
      return '8 năm';
    case SkillYear.NINE_YEAR:
      return '9 năm';
    case SkillYear.TEN_YEAR:
      return '10 năm';
    case SkillYear.MORE_THAN_10_YEAR:
      return 'Trên 10 năm';
    default:
      return '';
  }
}
