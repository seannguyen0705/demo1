import NavSide from './components/NavSide';
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" container mx-auto">
      <NavSide />
      <div className="lg:ml-64">{children}</div>
    </div>
  );
}
