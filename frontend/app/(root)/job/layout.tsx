import Filter from './components/Filter';
import OrderBy from './components/OrderBy';
import SearchJob from './components/SearchJob';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchJob />
      <div className="flex items-center justify-between max-w-[1000px] mx-auto">
        <Filter />
        {/* <OrderBy /> */}
      </div>

      {children}
    </>
  );
}
