import { IUser } from '@/api/interface';

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

interface IProps {
  user: IUser;
}
export default function Info({ user }: IProps) {
  const fields = [
    {
      name: 'email',
      icon: <Mail />,
      value: user.email,
    },
    {
      name: 'phone',
      icon: <Phone />,
      value: user.phoneNumber,
    },
    {
      name: 'birthday',
      icon: <Calendar />,
      value: user.bod,
    },
    {
      name: 'gender',
      icon: <VenusAndMars />,
      value: user.gender,
    },
    {
      name: 'address',
      icon: <MapPin />,
      value: user.address,
    },
    {
      name: 'personal_website',
      icon: <Globe />,
      value: user.personal_website,
    },
  ];
  return (
    <section className="dark:bg-gray-900 bg-[#EBF5F4] rounded-[20px] relative  ">
      <div className=" flex items-center gap-2 p-4  ">
        <Image
          src={getUserAvatar(user)}
          height={96}
          width={96}
          className=" rounded-full"
          alt="avatar"
        />
        <div>
          <h6 className="text-lg md:text-2xl font-bold">{user.fullName}</h6>
          <p className="text-sm dark:text-gray-400 text-gray-500">
            {user.title}
          </p>
        </div>
      </div>

      <EditProfile user={user} />

      {/* 2 column info */}
      <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 p-4 ">
        {fields.map((field) => (
          <div key={field.name} className="flex items-center gap-2">
            {field.icon}
            <p className=" ">{field.value?.toString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
