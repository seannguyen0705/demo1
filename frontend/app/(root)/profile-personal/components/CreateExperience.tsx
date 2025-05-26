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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import useCreateExperience from '../hooks/useCreateExperience';
import { Select } from '@/components/ui/select';
import { SelectItem } from '@/components/ui/select';
import { SelectContent } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { FiPlusCircle } from 'react-icons/fi';
import { SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Editor from '@/components/Editor';
const formSchema = z.object({
  workTitle: z.string().min(1, 'Tên công việc không được để trống'),
  companyName: z.string().min(1, 'Tên công ty không được để trống'),
  startMonth: z.string().min(1, 'Vui lòng chọn tháng'),
  startYear: z.string().min(1, 'Vui lòng chọn năm'),
  endMonth: z.string(),
  endYear: z.string(),
  description: z.string(),
});

export default function CreateExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workTitle: '',
      companyName: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      description: '',
    },
  });

  const { mutate: createExperience, isPending: isCreating } =
    useCreateExperience();

  const [isCurrent, setIsCurrent] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isCurrent) {
      createExperience(
        {
          ...data,
          startDate: `${data.startMonth}/${data.startYear}`,
          endDate: 'Hiện tại',
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            form.reset();
          },
        },
      );
    } else {
      if (!data.endMonth) {
        form.setError('endMonth', {
          message: 'Vui lòng chọn tháng',
        });
        return;
      }
      if (!data.endYear) {
        form.setError('endYear', {
          message: 'Vui lòng chọn năm',
        });
        return;
      }
      createExperience(
        {
          ...data,
          startDate: `${data.startMonth}/${data.startYear}`,
          endDate: `${data.endMonth}/${data.endYear}`,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            form.reset();
          },
        },
      );
    }
  };
  const currentYear = new Date().getFullYear();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-[10px] right-[10px]" variant="outline">
          <FiPlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-full sm:h-auto overflow-auto">
        <DialogHeader>
          <DialogTitle>Kinh nghiệm làm việc</DialogTitle>
          <DialogDescription>
            Thêm kinh nghiệm làm việc của bạn
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="workTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên công việc</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên công ty</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex items-center space-x-2">
                <Checkbox
                  checked={isCurrent}
                  onCheckedChange={(checked: boolean) => setIsCurrent(checked)}
                  className="data-[state=checked]:bg-[#309689]"
                  id="current"
                />
                <label
                  htmlFor="current"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tôi đang làm việc tại đây
                </label>
              </div>

              <Label className="md:col-span-2">Ngày bắt đầu</Label>
              <FormField
                control={form.control}
                name="startMonth"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Tháng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, index) => (
                          <SelectItem key={index} value={`${index + 1}`}>
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Năm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: currentYear - 2000 + 1 }).map(
                          (_, index) => (
                            <SelectItem key={index} value={`${index + 2000}`}>
                              {index + 2000}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Label className="md:col-span-2">Ngày kết thúc</Label>
              <FormField
                disabled={isCurrent}
                control={form.control}
                name="endMonth"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={isCurrent}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Tháng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, index) => (
                          <SelectItem key={index} value={`${index + 1}`}>
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isCurrent}
                control={form.control}
                name="endYear"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={isCurrent}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" w-full">
                          <SelectValue placeholder="Năm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: currentYear - 2000 + 1 }).map(
                          (_, index) => (
                            <SelectItem key={index} value={`${index + 2000}`}>
                              {index + 2000}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Editor onChange={field.onChange} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Đang tạo...' : 'Tạo kinh nghiệm'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
