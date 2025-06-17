'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useRegisterCandidate from '../hooks/useRegisterCandidate';
import Link from 'next/link';

// Define the form schema with Zod
const formSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Tên phải có ít nhất 2 ký tự' })
      .max(50, { message: 'Tên phải có tối đa 50 ký tự' }),
    email: z.string().email({ message: 'Email không hợp lệ' }),
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
type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: registerCandidate, isPending } = useRegisterCandidate();

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    registerCandidate(data, {
      onSuccess: () => {
        setIsSuccess(true);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        {isSuccess && (
          <div className="flex items-center gap-2 bg-light-green p-4 rounded-md text-sm text-green mb-4">
            <Info className="w-6 h-6" />
            Vui lòng kiểm tra email để xác thực tài khoản
          </div>
        )}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Nguyen Van A" {...field} className="selection:bg-green" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <div>
                  <div className="relative flex items-center">
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
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                    </Button>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    *Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái viết hoa, ký tự đặc biệt, chữ cái viết thường và
                    số
                  </p>
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
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#309689] hover:bg-[#309689]/80" disabled={isPending}>
          {isPending ? 'Đang tạo tài khoản' : 'Đăng ký'}
        </Button>
        <div className="text-sm flex  justify-end items-center gap-x-1">
          <span className="text-muted-foreground">Đã có tài khoản?</span>
          <Link href="/sign-in" className="underline">
            Đăng nhập
          </Link>
        </div>
      </form>
    </Form>
  );
}
