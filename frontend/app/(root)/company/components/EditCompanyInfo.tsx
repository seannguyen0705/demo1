'use client';
import { ICompany } from '@/apiService/company/interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useUpdateCompanyInfo from '../hooks/useUpdateCompanyInfo';
import { useState } from 'react';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import useGetMe from '@/app/hooks/useGetMe';

const formSchema = z.object({
  type: z.string(),
  industry: z.string(),
  size: z.string(),
  country: z.string(),
  workingDay: z.string(),
  workingTime: z.string(),
});

interface IProps {
  company: ICompany;
}

export default function EditCompanyInfo({ company }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useGetMe();
  const isOwner = user?.id === company.employerId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: company.type || '',
      industry: company.industry || '',
      size: company.size || '',
      country: company.country || '',
      workingDay: company.workingDay || '',
      workingTime: company.workingTime || '',
    },
  });

  const { mutate: updateCompany, isPending } = useUpdateCompanyInfo({
    name: company.name,
  });

  if (!isOwner) {
    return null;
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    updateCompany(values, {
      onSuccess: (data: object) => {
        if (!isErrorResponse(data)) {
          setIsOpen(false);
        }
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="" variant="outline">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full overflow-auto sm:h-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thông tin công ty</DialogTitle>
          <DialogDescription>Cập nhật thông tin công ty của bạn</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại hình công ty</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Công ty cổ phần" className="selection:bg-green" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lĩnh vực công ty</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Công nghệ thông tin" className="selection:bg-green" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quy mô công ty</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 100-500" className="selection:bg-green" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quốc gia</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Việt Nam" className="selection:bg-green" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workingDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày làm việc</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Thứ 2 - Thứ 6" className="selection:bg-green" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giờ làm việc</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 8h - 17h" className="selection:bg-green" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
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
