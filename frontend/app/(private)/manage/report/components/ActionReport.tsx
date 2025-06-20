import ConfirmAction from '@/app/(private)/manage-candidates/components/ConfirmAction';
import DialogReport from './DialogReport';
import { Trash2 } from 'lucide-react';
import useDeleteContactById from '../hooks/useDeleteContactById';

export default function ActionReport({ id }: { id: string }) {
  const { mutate: deleteReport, isPending } = useDeleteContactById();
  return (
    <div className="flex items-center gap-2">
      <DialogReport id={id} />
      <ConfirmAction
        title="Xóa báo cáo"
        description="Bạn có chắc chắn muốn xóa báo cáo này không?"
        action={() => deleteReport(id)}
        button={
          <button
            className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border"
            disabled={isPending}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        }
      />
    </div>
  );
}
