import { Suspense } from 'react';
import NavSide from './components/NavSide';
export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto pt-8">
      <NavSide />
      <Suspense>
        <div className="lg:ml-64">{children}</div>
      </Suspense>
    </div>
  );
}
