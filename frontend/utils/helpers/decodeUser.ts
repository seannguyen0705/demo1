import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../enums';

export default function decodeUser(token: string) {
  try {
    return jwtDecode(token) as { role: UserRole };
  } catch {
    return null;
  }
}
