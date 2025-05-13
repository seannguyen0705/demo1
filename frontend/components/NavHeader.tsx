import Image from 'next/image';
import Link from 'next/link';
import CenterNav from './CenterNav';

export default function NavHeader() {
  return (
    <header className=" py-[20px]">
      <nav className=" flex items-center justify-between">
        <Link href={'/'} className=" flex items-center flex-row gap-x-[10px]">
          <Image src={'/logo.svg'} width={20} height={20} alt="logo" />
          <span className=" text-xl font-semibold ">Job Portal</span>
        </Link>

        <CenterNav />

        <div>
          <Link
            className=" py-2 px-4 text-white font-semibold "
            href={'/sign-in'}
          >
            Login
          </Link>
          <Link
            className="py-2 px-4 font-semibold bg-[#309689] text-white rounded-md"
            href={'/sign-up'}
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
