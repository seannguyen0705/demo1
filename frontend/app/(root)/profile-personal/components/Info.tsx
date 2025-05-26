import { IUser } from '@/api/interface';
import { Skeleton } from '@/components/ui/skeleton';
import getUserAvatar from '@/utils/helpers/getUserAvatar';
import {
  Calendar,
  Globe,
  Mail,
  MapPin,
  Phone,
  VenusAndMars,
} from 'lucide-react';
import Image from 'next/image';
import EditProfile from './EditProfile';

function SkeletonInfo() {
  return (
    <section className="dark:bg-gray-900 bg-[#EBF5F4] rounded-[20px] relative">
      <div className="flex items-center gap-2 p-4">
        <Skeleton className="h-24 w-24 rounded-full bg-white/50" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 bg-white/50" />
          <Skeleton className="h-4 w-32 bg-white/50" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 p-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 bg-white/50" />
            <Skeleton className="h-4 w-32 bg-white/50" />
          </div>
        ))}
      </div>
    </section>
  );
}

interface IProps {
  user: IUser | undefined;
}

export default function Info({ user }: IProps) {
  if (!user) {
    return <SkeletonInfo />;
  }

  const fields = [
    {
      name: 'email',
      icon: <Mail />,
      value: user?.email,
    },
    {
      name: 'phone',
      icon: <Phone />,
      value: user?.phoneNumber,
    },
    {
      name: 'birthday',
      icon: <Calendar />,
      value: user?.bod,
    },
    {
      name: 'gender',
      icon: <VenusAndMars />,
      value: user?.gender,
    },
    {
      name: 'address',
      icon: <MapPin />,
      value: user?.address,
    },
    {
      name: 'personal_website',
      icon: <Globe />,
      value: user?.personal_website,
    },
  ];
  return (
    <section className="dark:bg-gray-900 bg-[#EBF5F4] rounded-[20px] relative">
      <div className="flex items-center gap-2 p-4">
        <Image
          src={getUserAvatar(user)}
          height={96}
          width={96}
          className="rounded-full"
          alt="avatar"
        />
        <div>
          <h6 className="text-lg md:text-2xl font-bold">{user?.fullName}</h6>
          <p className="text-sm dark:text-gray-400 text-gray-500">
            {user?.title}
          </p>
        </div>
      </div>

      <EditProfile user={user} />

      <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 p-4">
        {fields.map((field) => (
          <div key={field.name} className="flex items-center gap-2">
            {field.icon}
            <p className="">{field.value?.toString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
