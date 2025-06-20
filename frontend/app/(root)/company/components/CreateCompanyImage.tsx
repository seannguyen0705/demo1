'use client';
import { ImagePlus } from 'lucide-react';
import useCreateCompanyImage from '../hooks/useCreateCompanyImage';
import { Input } from '@/components/ui/input';

interface Iprops {
  companyId: string;
}
export default function CreateCompanyImage({ companyId }: Iprops) {
  const { mutate: createCompanyImage, isPending } = useCreateCompanyImage({ companyId });
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    await Promise.all(Array.from(files).map((file) => createCompanyImage(file)));
    e.target.value = '';
  };
  return (
    <label
      className={`${isPending ? 'opacity-50' : 'cursor-pointer'} w-full h-full border-2 border-dashed rounded-md flex items-center justify-center`}
    >
      <Input onChange={handleChange} disabled={isPending} multiple type="file" className="hidden" />
      <ImagePlus className="size-30" />
    </label>
  );
}
