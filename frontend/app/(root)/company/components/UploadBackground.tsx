'use client';

import useGetMe from '@/app/hooks/useGetMe';
import useUpdateBackground from '../hooks/useUpdateBackground';
import { ICompany } from '@/apiService/company/interface';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
interface IProps {
  company: ICompany;
}
export default function UploadBackground({ company }: IProps) {
  const { user } = useGetMe();
  const { mutate: uploadBackground, isPending } = useUpdateBackground({ name: company.name });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadBackground(file);
    }
  };
  const isOwner = user?.id === company.employerId;
  if (!isOwner) {
    return (
      <Image
        src={company.background?.url || '/default_bg.webp'}
        alt={company.name}
        width={800}
        height={130}
        className="h-[130px] w-full object-cover"
      />
    );
  }
  return (
    <label className="cursor-pointer">
      <div className="relative">
        <Image
          src={company.background?.url || '/default_bg.webp'}
          alt={company.name}
          width={800}
          height={130}
          className="h-[130px] w-full object-cover"
        />
        {isPending && (
          <div className="absolute inset-0 flex items-center bg-black/50 justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        )}
      </div>
      <input disabled={isPending} onChange={handleOnChange} type="file" className="hidden" />
    </label>
  );
}
