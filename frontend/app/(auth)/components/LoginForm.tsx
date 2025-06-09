'use client';
import { z } from 'zod';
import useLogin from '../hooks/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserRole } from '@/utils/enums';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Info } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import EXCEPTION_CODE from '@/utils/constants/exception';

const formSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(1, { message: 'Mật khẩu không được để trống' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const currentPath = usePathname();

  let role = UserRole.CANDIDATE;
  let hrefForgetPassword = '/candidate/forget-password';
  if (currentPath.startsWith('/recruitment')) {
    role = UserRole.EMPLOYER;
    hrefForgetPassword = '/recruitment/forget-password';
  } else if (currentPath.startsWith('/admin')) {
    role = UserRole.ADMIN;
    hrefForgetPassword = '/admin/forget-password';
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    login(
      {
        ...data,
        role,
      },
      {
        onSuccess: (data) => {
          if (isErrorResponse(data)) {
            if (data.errorCode === EXCEPTION_CODE.INACTIVE_CANDIDATE_CODE) {
              setIsInactive(true);
            }
          }
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto space-y-4">
        {isInactive && (
          <div className="flex items-center gap-2 bg-light-green p-4 rounded-md text-sm text-green mb-4">
            <Info className="w-6 h-6" />
            Vui lòng kiểm tra email để xác thực tài khoản
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="selection:bg-green" type="email" placeholder="nguyenvan@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Mật khẩu</FormLabel>
                <Link href={hrefForgetPassword} className="text-sm hover:underline text-muted-foreground">
                  Quên mật khẩu?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    className="selection:bg-green"
                    type={showPassword ? 'text' : 'password'}
                    placeholder=""
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-muted-foreground h-4 w-4" />
                    ) : (
                      <Eye className="text-muted-foreground h-4 w-4" />
                    )}
                    <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#309689] hover:bg-[#309689]/80" disabled={isPending}>
          {isPending ? 'Đang đăng nhập' : 'Đăng nhập'}
        </Button>
        {role !== UserRole.ADMIN && (
          <div className="   flex items-center  justify-end gap-x-1 text-sm">
            <span className="text-muted-foreground">Chưa có tài khoản?</span>
            <Link href={role === UserRole.EMPLOYER ? '/recruitment' : '/sign-up'} className="underline">
              Đăng ký
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
