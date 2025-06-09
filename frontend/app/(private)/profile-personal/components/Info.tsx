import { IUser } from '@/api/interface';
import { Skeleton } from '@/components/ui/skeleton';
import getUserAvatar from '@/utils/helpers/getUserAvatar';
import { Calendar, Globe, Loader2, Mail, MapPin, Phone, VenusAndMars } from 'lucide-react';
import Image from 'next/image';
import EditProfile from './EditProfile';
import { UserRole } from '@/utils/enums';
import useUpdateAvatar from '../hooks/useUpdateAvatar';
import Link from 'next/link';

function SkeletonInfo() {
  return (
    <section className="relative rounded-[20px] bg-[#EBF5F4] dark:bg-gray-900">
      <div className="flex items-center gap-2 p-4">
        <Skeleton className="h-24 w-24 rounded-full bg-white/50" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 bg-white/50" />
          <Skeleton className="h-4 w-32 bg-white/50" />
        </div>
      </div>

      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
  const { mutate: updateAvatar, isPending } = useUpdateAvatar({ role: user?.role });
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
  ];
  if (user.role === UserRole.EMPLOYER) {
    // remove address
    fields.splice(4, 1);
  }

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateAvatar(file);
    }
  };

  return (
    <section className="relative rounded-[20px] bg-[#EBF5F4] dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row items-center gap-2 p-4">
        <label className="cursor-pointer relative">
          <Image
            src={getUserAvatar(user)}
            height={96}
            width={96}
            className="rounded-full object-cover size-[96px]"
            alt="avatar"
          />
          {isPending && (
            <div className="absolute rounded-full inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          )}
          <input onChange={onChangeFile} type="file" className="hidden" />
        </label>
        <div>
          <h6 className="text-lg font-bold md:text-2xl">{user?.fullName}</h6>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">{user?.title}</p>
        </div>
      </div>

      <EditProfile user={user} />

      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="flex items-center gap-2">
            {field.icon}
            <p className="">{field.value?.toString() || 'Chưa cập nhật'}</p>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Globe />
          <Link className="" target="_blank" href={user?.personal_website || ''}>
            {user?.personal_website || 'Chưa cập nhật'}
          </Link>
        </div>
      </div>
    </section>
  );
}
