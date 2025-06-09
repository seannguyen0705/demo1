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
import useForgotPassword from '../../hooks/useForgotPassword';
import { UserRole } from '@/utils/enums';
const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export default function ForgetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement password reset logic
    forgotPassword(
      { email: values.email, role: UserRole.EMPLOYER },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      },
    );
  }

  return (
    <main className="flex flex-col w-full h-[60vh] items-center justify-center pt-8 px-2">
      <h1 className="text-2xl font-bold mb-4">Quên mật khẩu</h1>
      <Card className="w-full max-w-md">
        <CardHeader></CardHeader>
        <CardContent>
          {isSuccess && (
            <div className="flex items-center gap-2 bg-light-green p-4 rounded-md text-sm text-green mb-4">
              <Info className="w-6 h-6" />
              Gửi yêu cầu thành công. Vui lòng kiểm tra email để đặt lại mật khẩu
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="selection:bg-green" placeholder="Nhập email nhà tuyển dụng" {...field} />
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
                Gửi yêu cầu
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
    </main>
  );
}
