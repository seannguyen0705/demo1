'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useResetPassword from '../hooks/useResetPassword';

const formSchema = z
  .object({
    password: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

export default function FormResetPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const { mutate: resetPassword, isPending } = useResetPassword();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement password reset logic
    if (token) {
      resetPassword(
        { accountToken: token, password: values.password },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
        },
      );
    }
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader></CardHeader>
      <CardContent>
        {isSuccess && (
          <div className="flex items-center gap-2 bg-light-green p-4 rounded-md text-sm text-green mb-4">
            <Info className="w-6 h-6" />
            Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input type="password" className="selection:bg-green" placeholder="Nhập mật khẩu mới" {...field} />
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
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="selection:bg-green"
                      placeholder="Nhập lại mật khẩu mới"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-green hover:bg-green/90 disabled:opacity-50"
            >
              Đặt lại mật khẩu
            </Button>
            <div className="text-center">
              <Link href="/sign-in" className="text-sm font-medium text-primary hover:text-primary/90">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
