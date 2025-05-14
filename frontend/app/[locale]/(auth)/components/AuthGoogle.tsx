import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { redirectToGoogleLogin } from '../action';
export default function AuthGoogle() {
  return (
    <Button
      onClick={redirectToGoogleLogin}
      variant="outline"
      className="w-full"
    >
      <FcGoogle />
      Sign in with Google
    </Button>
  );
}
