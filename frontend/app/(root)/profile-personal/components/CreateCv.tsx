'use client';

import { CirclePlus } from 'lucide-react';
import useCreateCv from '../hooks/useCreateCv';

interface IProps {
  countCv: number;
}
export default function CreateCv({ countCv }: IProps) {
  const { mutate: createCv, isPending: isCreating } = useCreateCv();
  const handleCreateCv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      createCv(file);
    }
  };
  const disable = countCv >= 3 || isCreating;
  return (
    <li
      className={`p-4 border rounded-lg ${!disable && 'hover:shadow-md'}  transition-shadow`}
    >
      <label
        htmlFor="cv-upload"
        className={`flex items-center justify-center cursor-pointer gap-2 ${disable && 'opacity-50'}`}
      >
        <CirclePlus size={30} />
        <span className="text-sm font-medium">Tạo CV {countCv}/3 </span>
      </label>
      <input
        disabled={disable}
        id="cv-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleCreateCv}
      />
    </li>
  );
}
