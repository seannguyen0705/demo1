'use client';
import { z } from 'zod';
import useLogin from '../hooks/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserRole } from '@/utils/enums';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(1, { message: 'Mật khẩu không được để trống' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const currentPath = usePathname();

  let role = UserRole.CANDIDATE;
  if (currentPath.includes('recruitment')) {
    role = UserRole.EMPLOYER;
  } else if (currentPath.includes('admin')) {
    role = UserRole.ADMIN;
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    login({
      ...data,
      role,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="selection:bg-green"
                  type="email"
                  placeholder="nguyenvan@gmail.com"
                  {...field}
                />
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
              <FormLabel>Mật khẩu</FormLabel>
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
                    <span className="sr-only">
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-[#309689] hover:bg-[#309689]/80"
          disabled={isPending}
        >
          {isPending ? 'Đang đăng nhập' : 'Đăng nhập'}
        </Button>
        {role !== UserRole.ADMIN && (
          <div className="   flex items-center  justify-end gap-x-1 text-sm">
            <span className="text-muted-foreground">Chưa có tài khoản?</span>
            <Link
              href={role === UserRole.EMPLOYER ? '/recruitment' : '/sign-up'}
              className="underline"
            >
              Đăng ký
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
