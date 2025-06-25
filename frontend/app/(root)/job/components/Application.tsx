'use client';

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
import { IJob } from '@/apiService/job/interface';
import { z } from 'zod';
import useGetMe from '@/app/hooks/useGetMe';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import Editor from '@/components/Editor';
import SelectProvince from './SelectProvince';
import SelectCv from './SelectCv';
import useCreateApplyJob from '../hooks/useCreateApplyJob';

const formSchema = z.object({
  fullName: z.string().min(1, { message: 'Tên không được để trống' }),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, { message: 'Số điện thoại không hợp lệ' }),
  expectedAddress: z.array(z.string()).min(1, { message: 'Địa chỉ mong muốn không được để trống' }),
  message: z.string().optional(),
  fileId: z.string().min(1, { message: 'Bạn chưa chọn CV' }),
});

interface IProps {
  job: IJob;
}
export default function Application({ job }: IProps) {
  const { user } = useGetMe();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      phoneNumber: user?.phoneNumber || '',
      expectedAddress: [],
      message: '',
      fileId: '',
    },
  });
  const { mutate: createApplyJob, isPending } = useCreateApplyJob({ jobId: job.id });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createApplyJob(
      {
        ...values,
        jobId: job.id,
        candidateId: user?.id || '',
        expectedAddress: values.expectedAddress.join(', '),
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-green dark:bg-green dark:hover:bg-green/80 hover:bg-green/80 text-white hover:text-white"
          variant="outline"
        >
          Ứng tuyển
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-auto max-h-full sm:p-6 p-2 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ứng tuyển vào {job.company.name}</DialogTitle>
          <DialogDescription className="text-gray-800 dark:text-gray-200">
            Cập nhật thông tin bên dưới để ứng tuyển vào vị trí <span className="font-bold">{job.title}</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h3>Cv ứng tuyển</h3>
            <FormField
              control={form.control}
              name="fileId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SelectCv fileId={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3>Thông tin cá nhân</h3>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input {...field} className="selection:bg-green" />
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
                    <Input {...field} className="selection:bg-green" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ mong muốn</FormLabel>
                  <FormControl>
                    <SelectProvince value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lời nhắn</FormLabel>
                  <FormControl>
                    <Editor value={field.value || ''} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                disabled={isPending}
                className="bg-[#309689] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#309689] hover:opacity-80"
                type="submit"
              >
                Gửi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
