import { IUser } from '@/api/interface';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useUpdateUser from '@/app/(private)/profile-personal/hooks/useUpdateUser';
interface IProps {
  user: IUser;
}
export default function AllowNotify({ user }: IProps) {
  const { role, allowNotify } = user;
  const { mutate: updateUser } = useUpdateUser({ role });
  return (
    <section className="bg-light-green space-y-4 rounded-[20px] dark:bg-gray-900 p-4">
      <h2 className="text-2xl font-bold">Thông báo khi có công việc mới</h2>

      <div className="flex sm:pr-6 flex-col sm:flex-row  text-base sm:justify-between gap-2 py-3 border-y border-gray-200">
        <Label htmlFor="allow-notify" className="text-base">
          Cho phép nhận thông báo khi có công việc mới
        </Label>
        <div className="inline-flex items-center gap-2">
          <span className="sm:min-w-[130px] text-right">{allowNotify ? 'Có' : 'Không'}</span>
          <Switch
            id="allow-notify"
            checked={allowNotify}
            onCheckedChange={() => updateUser({ allowNotify: !allowNotify })}
          />
        </div>
      </div>
    </section>
  );
}
