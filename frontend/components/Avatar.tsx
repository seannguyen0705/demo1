'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import UserNavSide from './UserNavSide';
import { IUser } from '@/api/interface';
import getUserAvatar from '@/utils/helpers/getUserAvatart';
interface IProps {
  user: IUser;
}

export default function Avatar({ user }: IProps) {
  const [openNavSide, setOpenNavSide] = useState(false);
  const avatar_url = getUserAvatar(user);
  return (
    <>
      <button
        onClick={() => setOpenNavSide(!openNavSide)}
        className=" relative"
      >
        <Image
          className="  rounded-full border dark:border-gray-700 border-gray-300"
          src={avatar_url}
          alt="avatar"
          width={32}
          height={32}
        />
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full  absolute right-[0px]  bottom-0">
          <ChevronDown size={12} />
        </div>
      </button>

      {/* Overlay */}
      {openNavSide && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-40"
          onClick={() => setOpenNavSide(false)}
        />
      )}
      <UserNavSide
        openNavSide={openNavSide}
        setOpenNavSide={setOpenNavSide}
        user={user}
      />
    </>
  );
}
