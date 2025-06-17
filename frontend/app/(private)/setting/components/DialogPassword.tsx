import { IUser } from '@/api/interface';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import useUpdateUser from '../../profile-personal/hooks/useUpdateUser';
import { useChangePassword } from '../hooks/useChangePassword';

const formSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Mật khẩu hiện tại không được để trống' }),
    newPassword: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
      .regex(/[A-Z]/, {
        message: 'Mật khẩu phải có ít nhất 1 chữ cái viết hoa',
      })
      .regex(/[a-z]/, {
        message: 'Mật khẩu phải có ít nhất 1 chữ cái viết thường',
      })
      .regex(/[0-9]/, { message: 'Mật khẩu phải có ít nhất 1 chữ số' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function DialogPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: changePassword, isPending } = useChangePassword();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: FormValues) {
    changePassword(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
      },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border border-green">
          Thay đổi mật khẩu
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thay đổi mật khẩu</DialogTitle>
          <DialogDescription>
            Mật khẩu phải có ít nhất 8 kí tự, gồm ít nhất 1 kí tự đặc biệt, 1 chữ viết HOA, 1 chữ viết thường.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div>
                      <div className="relative flex items-center">
                        <Input
                          className="selection:bg-green"
                          type={showCurrentPassword ? 'text' : 'password'}
                          placeholder=""
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showCurrentPassword ? 'Hide password' : 'Show password'}</span>
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <div>
                      <div className="relative flex items-center">
                        <Input
                          className="selection:bg-green"
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder=""
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showNewPassword ? 'Hide password' : 'Show password'}</span>
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                  <FormControl>
                    <div>
                      <div className="relative flex items-center">
                        <Input
                          className="selection:bg-green"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder=""
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showConfirmPassword ? 'Hide password' : 'Show password'}</span>
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Hủy
                </Button>
              </DialogClose>
              <Button className="bg-[#309689] hover:bg-[#309689] hover:opacity-80" type="submit" disabled={isPending}>
                {isPending ? 'Đang cập nhật...' : 'Lưu thay đổi'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
