import { ICompanyImage } from '@/api/company-image/interface';
import Image from 'next/image';
import useDeleteCompanyImage from '../hooks/useDeleteCompanyImage';
import { Loader2, X } from 'lucide-react';

interface IProps {
  image: ICompanyImage;
}

export default function CompanyImageItem({ image }: IProps) {
  const { mutate: deleteCompanyImage, isPending } = useDeleteCompanyImage({ companyId: image.companyId });
  return (
    <li className="relative flex items-center" key={image.id}>
      <Image src={image.url} alt={image.id} width={100} height={100} className="w-full h-auto" />
      <button disabled={isPending} onClick={() => deleteCompanyImage(image.id)}>
        <X className="absolute p-1 bg-red-500 rounded-full text-white hover:opacity-50 top-0 right-0" />
      </button>
      {isPending && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}
    </li>
  );
}
