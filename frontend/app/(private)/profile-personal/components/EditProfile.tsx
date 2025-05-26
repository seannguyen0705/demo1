'use client';
import { IUser } from '@/api/interface';
import { SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Gender, UserRole } from '@/utils/enums';
import { format } from 'date-fns';
import { useState } from 'react';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import useUpdateUser from '../hooks/useUpdateUser';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  gender: z.nativeEnum(Gender),
  bod: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Ngày sinh không hợp lệ',
  }),
  address: z.string(),
  personal_website: z
    .string()
    .url('Invalid website URL')
    .optional()
    .or(z.literal('')),
});

interface IProps {
  user: IUser | undefined;
}

export default function EditProfile({ user }: IProps) {
  const { mutate: updateUser, isPending } = useUpdateUser({
    role: user?.role || UserRole.CANDIDATE,
  });
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      title: user?.title || '',
      phoneNumber: user?.phoneNumber || '',
      gender: user?.gender || Gender.MALE,
      bod: user?.bod ? format(new Date(user.bod), 'yyyy-MM-dd') : '',
      address: user?.address || '',
      personal_website: user?.personal_website || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser(values, {
      onSuccess: (data: object) => {
        if (!isErrorResponse(data)) {
          setIsOpen(false);
        }
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-[20px] right-[24px]" variant="outline">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full overflow-auto sm:h-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thông tin cá nhân</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cá nhân của bạn
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chức danh</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="bg-gray-100"
                    readOnly
                    value={user?.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Gender.MALE}>Nam</SelectItem>
                        <SelectItem value={Gender.FEMALE}>Nữ</SelectItem>
                        <SelectItem value={Gender.OTHER}>Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày sinh</FormLabel>
                    <FormControl className="">
                      <Input className="" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.role !== UserRole.EMPLOYER && (
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="personal_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website cá nhân</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                className="bg-[#309689] hover:bg-[#309689] hover:opacity-80"
                type="submit"
                disabled={isPending}
              >
                {isPending ? 'Đang cập nhật...' : 'Lưu thay đổi'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
