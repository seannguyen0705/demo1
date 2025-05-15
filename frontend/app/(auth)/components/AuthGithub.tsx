import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function AuthGithub() {
  return (
    <Link
      href={process.env.BACKEND_URL + '/api/v1/github/login'}
      className="w-full flex items-center justify-center gap-2 border rounded-md py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
    >
      <FaGithub />
      Đăng nhập với Github
    </Link>
  );
}
