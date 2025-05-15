import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function AuthGoogle() {
  return (
    <Link
      href={process.env.BACKEND_URL + '/api/v1/google/login'}
      className="w-full flex items-center justify-center gap-2 border rounded-md py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
    >
      <FcGoogle />
      Đăng nhập với Google
    </Link>
  );
}
