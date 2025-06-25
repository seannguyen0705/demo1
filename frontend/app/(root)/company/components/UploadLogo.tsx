'use client';

import useGetMe from '@/app/hooks/useGetMe';
import { ICompany } from '@/apiService/company/interface';
import Image from 'next/image';
import useUploadLogo from '../hooks/useUploadLogo';
import { Loader2 } from 'lucide-react';
interface IProps {
  company: ICompany;
}
export default function UploadLogo({ company }: IProps) {
  const { user } = useGetMe();
  const { mutate: uploadLogo, isPending } = useUploadLogo({ name: company.name });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadLogo(file);
    }
  };

  const isOwner = user?.id === company.employerId;
  if (!isOwner) {
    return (
      <Image
        src={company.logo?.url || '/default_logo.png'}
        alt={company.name}
        width={128}
        height={128}
        className="relative -top-14 left-8 size-[128px] rounded-sm border-2 border-white bg-white"
      />
    );
  }
  return (
    <label className="cursor-pointer inline-block relative -top-14 left-8">
      <Image
        src={company.logo?.url || '/default_logo.png'}
        alt={company.name}
        width={128}
        height={128}
        className="size-[128px] rounded-sm border-2 border-white bg-white"
      />
      <input disabled={isPending} onChange={handleOnChange} type="file" className="hidden" />
      {isPending && (
        <div className="absolute inset-0 flex items-center bg-black/50 justify-center">
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}
    </label>
  );
}
