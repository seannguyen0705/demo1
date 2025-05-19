import AuthGoogle from './AuthGoogle';
import AuthGithub from './AuthGithub';
export default function AuthThirdParty() {
  return (
    <ul className="flex flex-col gap-y-4 ">
      <li>
        <AuthGoogle />
      </li>
      <li>
        <AuthGithub />
      </li>
    </ul>
  );
}
