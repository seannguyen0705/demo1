import { ICompanyImage } from '@/apiService/company-image/interface';
import Image from 'next/image';
import useDeleteCompanyImage from '../hooks/useDeleteCompanyImage';
import { Loader2, X } from 'lucide-react';
import { useUpdateCompanyImage } from '../hooks/useUpdateCompanyImage';

interface IProps {
  image: ICompanyImage;
}

export default function CompanyImageItem({ image }: IProps) {
  const { mutate: deleteCompanyImage, isPending: isDeleting } = useDeleteCompanyImage({ companyId: image.companyId });
  const { mutate: updateCompanyImage, isPending: isUpdating } = useUpdateCompanyImage({
    id: image.id,
    companyId: image.companyId,
  });
  const isPending = isDeleting || isUpdating;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateCompanyImage(file);
    }
  };

  return (
    <li className="relative flex items-center" key={image.fileId}>
      <label className="cursor-pointer w-full h-auto">
        <Image src={image.file.url} alt={image.fileId} width={100} height={100} className="w-full h-auto" />
        <input disabled={isPending} onChange={handleOnChange} type="file" className="hidden" />
      </label>
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
