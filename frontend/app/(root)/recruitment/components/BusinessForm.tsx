'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useRegisterBusiness from '@/app/(auth)/hooks/useRegisterBusiness';
import { Circle, LoaderCircle, Minus, Plus } from 'lucide-react';
import useUploadFile from '@/app/hooks/useUploadFile';
import useDeleteFile from '@/app/hooks/useDeleteFile';
import { useEffect } from 'react';
import Link from 'next/link';

const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  workTitle: z.string().min(2, 'Chức vụ phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phoneNumber: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),

  // Company Information
  name: z.string().min(2, 'Tên công ty phải có ít nhất 2 ký tự'),
  address: z
    .array(z.string().min(1, 'Địa chỉ công ty phải có ít nhất 1 ký tự'))
    .min(1, 'Phải nhập ít nhất 1 địa chỉ')
    .max(3, 'Chỉ được nhập tối đa 3 địa chỉ'),
  website: z.string().url('Địa chỉ website không hợp lệ'),

  proofId: z.string().min(1, 'Vui lòng tải lên tài liệu minh chứng'),
});
export type BusinessFormSchema = z.infer<typeof formSchema>;

export default function BusinessForm() {
  const form = useForm<BusinessFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      workTitle: '',
      email: '',
      phoneNumber: '',
      name: '',
      address: [''],
      website: '',
      proofId: '',
    },
  });
  const { mutate: registerBusiness, isPending } = useRegisterBusiness();

  function onSubmit(values: BusinessFormSchema) {
    registerBusiness(values);
  }
  const {
    fileId,
    mutate: uploadFile,
    isPending: isUploading,
  } = useUploadFile();
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteFile();

  useEffect(() => {
    form.setValue('proofId', fileId);
  }, [fileId, form]);

  return (
    <div
      id="business-form"
      className="min-h-screen dark:bg-[#111827] rounded-lg bg-[#EBF5F4] py-[30px] md:py-[60px]"
    >
      <div className="container mx-auto px-[20px] md:px-[40px]">
        <h3 className=" text-center text-2xl font-bold">
          Đăng ký tài khoản doanh nghiệp
        </h3>
        <p className="text-center text-muted-foreground mb-[30px]">
          Vui lòng điền thông tin đầy đủ để đăng ký tài khoản doanh nghiệp
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin quý khách</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập họ và tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chức vụ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập chức vụ" {...field} />
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
                        <Input
                          placeholder="Nhập email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số điện thoại" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Company Information Section */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin công ty</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên công ty</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên công ty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" flex justify-between items-center">
                        Địa chỉ công ty
                        {field.value.length < 3 && (
                          <Button
                            type="button"
                            variant="outline"
                            className="bg-[#309689] size-[36px] text-white hover:text-white hover:bg-[#309689]/80"
                            onClick={() => {
                              field.onChange([...field.value, '']);
                            }}
                          >
                            <Plus />
                          </Button>
                        )}
                      </FormLabel>
                      <div className="space-y-2">
                        {field.value.map((_, index) => (
                          <div key={index} className="flex gap-2">
                            <FormControl>
                              <Input
                                placeholder={`Nhập địa chỉ công ty ${index + 1}`}
                                value={field.value[index]}
                                onChange={(e) => {
                                  const newValue = [...field.value];
                                  newValue[index] = e.target.value;
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                  const newValue = field.value.filter(
                                    (_, i) => i !== index,
                                  );
                                  field.onChange(newValue);
                                }}
                              >
                                <Minus />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ website</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập địa chỉ website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="proofId"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        File minh chứng{' '}
                        <span className=" text-xs text-muted-foreground">
                          *5MB (PDF, Word)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="proofId"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            disabled={isUploading || isDeleting}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) {
                                return;
                              }
                              if (fileId) {
                                deleteFile(fileId);
                              }
                              uploadFile({ file, folder: 'company_proof' });
                              form.setValue('proofId', fileId);
                            }}
                            {...field}
                          />
                          {(isUploading || isDeleting) && (
                            <div className="absolute top-0 translate-y-1/2 right-0">
                              <LoaderCircle className="size-4 mr-2 animate-spin" />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full  bg-[#309689] hover:bg-[#309689]/80 disabled:opacity-50"
              disabled={isPending || isUploading || isDeleting}
            >
              {(isPending || isUploading || isDeleting) && (
                <div className="flex items-center justify-center">
                  <Circle className="size-4 mr-2 animate-spin" />
                </div>
              )}
              Đăng ký
            </Button>
          </form>
        </Form>
        <div className=" mt-[10px]  text-sm flex  justify-end items-center gap-x-1">
          <span className="text-muted-foreground">
            Đã có tài khoản doanh nghiệp?
          </span>
          <Link href="/recruitment/sign-in" className="underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
