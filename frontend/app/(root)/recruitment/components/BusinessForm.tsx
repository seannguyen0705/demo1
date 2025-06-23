'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useRegisterBusiness from '@/app/(auth)/hooks/useRegisterBusiness';
import { Circle, LoaderCircle, Minus, Plus } from 'lucide-react';
import useUploadFile from '@/app/hooks/useUploadFile';
import useDeleteFile from '@/app/hooks/useDeleteFile';
import { useEffect } from 'react';
import Link from 'next/link';
import SelectProvince from '@/components/SelectProvince';

const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  title: z.string().min(2, 'Chức vụ phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại phải có 10 số và bắt đầu bằng 0'),

  // Company Information
  name: z.string().min(2, 'Tên công ty phải có ít nhất 2 ký tự'),
  addresses: z.array(
    z.object({
      detail: z.string().min(1, 'Địa chỉ công ty phải có ít nhất 1 ký tự'),
      provinceId: z.string().min(1, 'Tỉnh/thành phố không được để trống'),
    }),
  ),
  website: z.string().url('Địa chỉ website không hợp lệ'),
  proofId: z.string().min(1, 'Vui lòng tải lên tài liệu minh chứng'),
});
export type BusinessFormSchema = z.infer<typeof formSchema>;

export default function BusinessForm() {
  const form = useForm<BusinessFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      title: '',
      email: '',
      phoneNumber: '',
      name: '',
      addresses: [{ detail: '', provinceId: '' }],
      website: '',
      proofId: '',
    },
  });
  const { mutate: registerBusiness, isPending } = useRegisterBusiness();

  function onSubmit(values: BusinessFormSchema) {
    registerBusiness(values);
  }
  const { fileId, mutate: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteFile();

  useEffect(() => {
    form.setValue('proofId', fileId);
  }, [fileId, form]);

  return (
    <div id="business-form" className="bg-light-green min-h-screen rounded-lg py-[30px] md:py-[60px] dark:bg-[#111827]">
      <div className="container mx-auto px-[20px] md:px-[40px]">
        <h3 className="text-center text-2xl font-bold">Đăng ký tài khoản doanh nghiệp</h3>
        <p className="text-muted-foreground mb-[30px] text-center">
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
                        <Input className="selection:bg-green" placeholder="Nhập họ và tên" {...field} />
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
                      <FormLabel>Chức vụ</FormLabel>
                      <FormControl>
                        <Input className="selection:bg-green" placeholder="Nhập chức vụ" {...field} />
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
                        <Input className="selection:bg-green" placeholder="Nhập email" type="email" {...field} />
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
                        <Input className="selection:bg-green" placeholder="Nhập số điện thoại" {...field} />
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
                        <Input className="selection:bg-green" placeholder="Nhập tên công ty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addresses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" flex items-center justify-between">Địa chỉ công ty</FormLabel>
                      <div className="space-y-2">
                        {field.value.map((_, index) => (
                          <div key={index} className="">
                            <FormControl>
                              <div className="grid sm:grid-cols-2 gap-2">
                                <SelectProvince
                                  provinceId={field.value[index].provinceId}
                                  onChange={(provinceId) => {
                                    const newValue = [...field.value];
                                    newValue[index].provinceId = provinceId;
                                    field.onChange(newValue);
                                  }}
                                />
                                <div className="flex items-center gap-2">
                                  <Input
                                    className="flex-1 w-full"
                                    placeholder="Địa chỉ cụ thể tại tỉnh/thành"
                                    value={field.value[index].detail}
                                    onChange={(e) => {
                                      const newValue = [...field.value];
                                      newValue[index].detail = e.target.value;
                                      field.onChange(newValue);
                                    }}
                                  />
                                  {field.value.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      onClick={() => {
                                        const newValue = field.value.filter((_, i) => i !== index);
                                        field.onChange(newValue);
                                      }}
                                    >
                                      <Minus />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </FormControl>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-dashed border-green"
                          onClick={() => {
                            field.onChange([...field.value, { provinceId: '', detail: '' }]);
                          }}
                        >
                          <Plus /> Thêm địa chỉ
                        </Button>
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
                        <Input className="selection:bg-green" placeholder="Nhập địa chỉ website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="proofId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        File minh chứng <span className=" text-muted-foreground text-xs">*5MB (PDF, Word)</span>
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
                              uploadFile({ file, folder: 'proof' });
                              form.setValue('proofId', fileId);
                            }}
                            name={field.name}
                            ref={field.ref}
                          />
                          {(isUploading || isDeleting) && (
                            <div className="absolute top-0 right-0 translate-y-1/2">
                              <LoaderCircle className="mr-2 size-4 animate-spin" />
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
              className="w-full bg-[#309689] hover:bg-[#309689]/80 disabled:opacity-50"
              disabled={isPending || isUploading || isDeleting}
            >
              {(isPending || isUploading || isDeleting) && (
                <div className="flex items-center justify-center">
                  <Circle className="mr-2 size-4 animate-spin" />
                </div>
              )}
              Đăng ký
            </Button>
          </form>
        </Form>
        <div className="mt-[10px]  flex items-center  justify-end gap-x-1 text-sm">
          <span className="text-muted-foreground">Đã có tài khoản doanh nghiệp?</span>
          <Link href="/recruitment/sign-in" className="underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
