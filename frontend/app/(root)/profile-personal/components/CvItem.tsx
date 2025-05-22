'use client';
import { ICv } from '@/api/cv/interface';
import Link from 'next/link';
import { FileText, Trash2 } from 'lucide-react';
import UpdateCv from './UpdateCv';
import useDeleteCv from '../hooks/useDeleteCv';
import ConfirmDelete from '@/components/ConfirmDelete';
import useUpdateCv from '../hooks/useUpdateCv';

export default function CvItem({ cv }: { cv: ICv }) {
  const { mutate: deleteCv, isPending: isDeleting } = useDeleteCv();
  const { mutate: updateCv, isPending: isUpdating } = useUpdateCv();
  return (
    <li className="mb-4 px-4 pt-4 border rounded-lg hover:shadow-md transition-shadow">
      <Link className="" href={cv.url} target="_blank">
        <div className="flex items-center gap-2">
          <div className="shrink-0">
            <FileText />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold mb-1 truncate">{cv.name}</h3>
            <p className="text-sm text-gray-500">
              {cv.format.split('/')[1].toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Cập nhật lần cuối:</span>
          <p className="text-sm text-gray-500">
            {new Date(cv.updatedAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
        </div>
      </Link>
      <div className="flex items-center gap-2 justify-center">
        <UpdateCv
          cvId={cv.id}
          updateCv={updateCv}
          disabled={isUpdating || isDeleting}
        />
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
