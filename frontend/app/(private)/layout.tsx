import { getMe } from '@/api/auth/query';
import NavSide from './components/NavSide';
export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <div className=" container mx-auto">
      <NavSide user={user.data} />
      <div className="lg:ml-64">{children}</div>
    </div>
  );
}
