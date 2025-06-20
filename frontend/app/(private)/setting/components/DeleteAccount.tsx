import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useDeleteMe } from '../hooks/useDeleteMe';
import ConfirmAction from '../../manage-candidates/components/ConfirmAction';

export default function DeleteAccount() {
  const { mutate: deleteMe, isPending } = useDeleteMe();
  return (
    <section className="bg-light-green space-y-4 rounded-[20px] dark:bg-gray-900 p-4">
      <h2 className="text-2xl font-bold">Xóa tài khoản</h2>
      <p className="text-sm text-gray-500">
        Khi xóa tài khoản, tất cả dữ liệu của bạn sẽ bị xóa và không thể khôi phục lại.
      </p>
      <ConfirmAction
        action={() => deleteMe()}
        button={
          <Button disabled={isPending} variant="destructive">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Xóa tài khoản'}
          </Button>
        }
        description="Sau khi xóa tài khoản thì không thể khôi phục? Bạn có chắc chắn muốn xóa tài khoản của mình không?"
        title="Xóa tài khoản"
      />
    </section>
  );
}
