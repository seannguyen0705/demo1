import { ICv } from '@/api/cv/interface';

import { format } from 'date-fns';
import Link from 'next/link';
import { FaFilePdf } from 'react-icons/fa';

interface IProps {
  cv: ICv;
}
export default function CvItem({ cv }: IProps) {
  return (
    <article className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <Link href={cv.file.url} target="_blank">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-sm bg-red-100 dark:bg-red-900 inline">
            <FaFilePdf className="text-red-500 dark:text-red-400" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 truncate max-w-[260px] sm:max-w-full text-sm font-semibold">{cv.file.name}</h3>
            <p className="text-sm text-gray-500">{cv.file.format.split('/')[1].toUpperCase()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Cập nhật lần cuối:</span>
          <span className="text-sm text-gray-500">{format(new Date(cv.updatedAt), 'dd/MM/yyyy')}</span>
        </div>
      </Link>
    </article>
  );
}
