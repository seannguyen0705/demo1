'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { useEffect } from 'react';
import useDeleteFile from '@/app/hooks/useDeleteFile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import useUploadFile from '@/app/hooks/useUploadFile';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useCreateReport from '../hooks/useCreateReport';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  title: z.string().min(5, 'Tiêu đề phải có ít nhất 5 ký tự'),
  content: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
  fileId: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function FormReport() {
  const { fileId, mutate: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteFile();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      title: '',
      content: '',
      fileId: '',
    },
  });

  const { mutate: createReport, isPending: isCreating } = useCreateReport();

  const onSubmit = async (data: ContactFormData) => {
    createReport(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  useEffect(() => {
    form.setValue('fileId', fileId);
  }, [fileId, form]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gửi Tin Nhắn</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập họ và tên của bạn" {...field} className="selection:bg-green" />
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
                    <Input placeholder="Nhập email của bạn" type="email" {...field} className="selection:bg-green" />
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
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề tin nhắn" {...field} className="selection:bg-green" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập nội dung tin nhắn của bạn"
                      className="min-h-[120px] selection:bg-green"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File đính kèm (tùy chọn)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      disabled={isUploading || isDeleting}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) {
                          return;
                        }
                        if (fileId) {
                          deleteFile(fileId);
                        }
                        uploadFile({ file, folder: 'contact' });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full disabled:opacity-50"
              disabled={isCreating || isUploading || isDeleting}
            >
              {isCreating ? 'Đang gửi...' : 'Gửi liên hệ'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
