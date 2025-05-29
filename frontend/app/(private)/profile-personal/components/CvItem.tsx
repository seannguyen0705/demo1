'use client';
import { ICv } from '@/api/cv/interface';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { format } from 'date-fns';
import UpdateCv from './UpdateCv';
import useDeleteCv from '../hooks/useDeleteCv';
import ConfirmDelete from '@/components/ConfirmDelete';
import useUpdateCv from '../hooks/useUpdateCv';

export default function CvItem({ cv }: { cv: ICv }) {
  const { mutate: deleteCv, isPending: isDeleting } = useDeleteCv();
  const { mutate: updateCv, isPending: isUpdating } = useUpdateCv();
  return (
    <li className="mb-4 rounded-lg border px-4 pt-4 transition-shadow hover:shadow-md">
      <Link href={cv.file.url} target="_blank">
        <div className="flex items-center gap-2">
          <div className="shrink-0">
            <FileText />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 truncate text-sm font-semibold">{cv.file.name}</h3>
            <p className="text-sm text-gray-500">{cv.file.format.split('/')[1].toUpperCase()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Cập nhật lần cuối:</span>
          <p className="text-sm text-gray-500">{format(new Date(cv.updatedAt), 'dd/MM/yyyy')}</p>
        </div>
      </Link>
      <div className="flex items-center justify-center gap-2">
        <UpdateCv cvId={cv.id} updateCv={updateCv} disabled={isUpdating || isDeleting} />
        <ConfirmDelete
          icon={<span className="">Xóa</span>}
          title="Xóa CV"
          description="Bạn có chắc chắn muốn xóa CV này không?"
          action={() => deleteCv(cv.id)}
          disabled={isUpdating || isDeleting}
        />
      </div>
    </li>
  );
}
