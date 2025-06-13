import { Gender } from '../enums';

export default function getStringGender(gender?: Gender) {
  switch (gender) {
    case Gender.MALE:
      return 'Nam';
    case Gender.FEMALE:
      return 'Nữ';
    case Gender.OTHER:
      return 'Khác';
    default:
      return '';
  }
}
