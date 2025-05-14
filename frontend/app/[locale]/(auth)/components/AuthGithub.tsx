import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';
import { redirectToGithubLogin } from '../action';

export default function AuthGithub() {
  return (
    <Button
      onClick={redirectToGithubLogin}
      variant="outline"
      className="w-full"
    >
      <FaGithub />
      Sign in with Github
    </Button>
  );
}
