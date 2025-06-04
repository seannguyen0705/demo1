import useGetMyCv from '@/app/(private)/profile-personal/hooks/useGetMyCv';
import { format } from 'date-fns';
import Link from 'next/link';
import { ExternalLink, Upload } from 'lucide-react';
import useCreateCv from '@/app/(private)/profile-personal/hooks/useCreateCv';
import { useState } from 'react';

interface IProps {
  fileId: string;
  onChange: (fileId: string) => void;
}

export default function SelectCv({ fileId, onChange }: IProps) {
  const { myCvs } = useGetMyCv();
  const [selectedCvId, setSelectedCvId] = useState(fileId);

  const handleChange = (fileId: string) => {
    setSelectedCvId(fileId);
    onChange(fileId);
  };

  return (
    <ul className="space-y-2">
      {myCvs?.map((cv) => (
        <li
          key={cv.file.id}
          className={`relative bg-light-green border-2 rounded-lg p-3 ${selectedCvId === cv.file.id ? 'border-green' : 'border-transparent'}`}
        >
          <Link
            href={cv.file.url}
            target="_blank"
            className="relative z-10 hover:text-green inline-flex items-center gap-2"
          >
            {cv.file.name}
            <ExternalLink className="size-4" />
          </Link>
          <p className="text-sm text-gray-500">{cv.file.format.split('/')[1].toUpperCase()}</p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Ngày tạo:</span>
            <p className="text-sm text-gray-500">{format(new Date(cv.createdAt), 'dd/MM/yyyy')}</p>
          </div>

          <button type="button" onClick={() => handleChange(cv.file.id)} className="absolute inset-0"></button>
        </li>
      ))}
      <li>
        <CreateCv />
      </li>
    </ul>
  );
}

function CreateCv() {
  const disable = false;
  const { mutate: createCv, isPending: isCreating } = useCreateCv();
  const isPending = isCreating;
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    createCv(file);
  };

  return (
    <div className={`mt-4 w-full ${isPending && 'opacity-50'}`}>
      <label
        htmlFor="cv-upload"
        className={`flex items-center border border-dashed border-gray-300 rounded-lg p-3 flex-col justify-center cursor-pointer gap-2 ${disable && 'opacity-50'}`}
      >
        <div className="inline-flex items-center gap-2">
          Chọn File <Upload />{' '}
        </div>
        <p className="text-sm text-gray-500">Hỗ trợ định dạng .doc, .docx hoặc .pdf, dưới 3MB</p>
      </label>
      <input
        onChange={handleChangeFile}
        disabled={isPending}
        id="cv-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
    </div>
  );
}
