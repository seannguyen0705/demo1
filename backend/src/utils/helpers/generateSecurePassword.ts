import { randomBytes } from 'crypto';

export default function generateSecurePassword(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#';
  const charsLength = chars.length;

  const randomBuffer = randomBytes(length);
  let password = '';

  for (let i = 0; i < length; i++) {
    const index = randomBuffer[i] % charsLength;
    password += chars[index];
  }

  return password;
}
