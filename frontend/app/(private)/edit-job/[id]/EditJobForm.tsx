'use client';

import { JobStatus, SalaryType } from '@/utils/enums';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { FormProvider } from 'react-hook-form';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateJobInfo from '../../create-job/components/CreateJobInfo';
import CreateJobDescription from '../../create-job/components/CreateJobDescription';
import CreateJobRequirement from '../../create-job/components/CreateJobRequirement';
import CreateJobBenefit from '../../create-job/components/CreateJobBenefit';
import { IJob } from '@/api/job/interface';
import useUpdatePublishedJob from '../hooks/useUpdatePublishedJob';
import { format } from 'date-fns';
const formSchema = z
  .object({
    title: z.string().min(1, {
      message: 'Tên công việc không được để trống',
    }),
    salaryType: z.string().min(1, {
      message: 'Loại lương không được để trống',
    }),
    salaryMin: z.string().optional(),
    salaryMax: z.string().optional(),
    addressIds: z.array(z.string()).min(1, {
      message: 'Địa chỉ công ty không được để trống',
    }),
    jobLevel: z.string().min(1, {
      message: 'Cấp bậc công việc không được để trống',
    }),
    jobType: z.string().min(1, {
      message: 'Loại công việc không được để trống',
    }),
    jobExpertise: z.string().min(1, {
      message: 'Chuyên ngành không được để trống',
    }),
    jobDomain: z.string().min(1, {
      message: 'Lĩnh vực công việc không được để trống',
    }),
    description: z.string().min(1, {
      message: 'Mô tả công việc không được để trống',
    }),
    benefit: z.string().min(1, {
      message: 'Lợi ích không được để trống',
    }),
    requirement: z.string().min(1, {
      message: 'Yêu cầu công việc không được để trống',
    }),
    skills: z.array(z.object({ value: z.string(), label: z.string() })).min(1, {
      message: 'Kỹ năng không được để trống',
    }),
    expiredAt: z.string().min(1, {
      message: 'Ngày hết hạn không được để trống',
    }),
  })
  .refine(
    (data) => {
      if (data.salaryMin && data.salaryMax && data.salaryType === SalaryType.RANGE) {
        const min = parseInt(data.salaryMin, 10);
        const max = parseInt(data.salaryMax, 10);
        return max > min;
      }
      return true;
    },
    {
      message: 'Lương tối đa phải lớn hơn lương tối thiểu',
      path: ['salaryMax'],
    },
  )
  .refine(
    (data) => {
      if (!data.salaryMin && data.salaryType === SalaryType.ATLEAST) {
        return false;
      }
      return true;
    },
    {
      message: 'Lương tối thiểu không được để trống',
      path: ['salaryMin'],
    },
  )
  .refine(
    (data) => {
      if (!data.salaryMax && data.salaryType === SalaryType.UPTO) {
        return false;
      }
      return true;
    },
    {
      message: 'Lương tối đa không được để trống',
      path: ['salaryMax'],
    },
  )
  .refine(
    (data) => {
      if (data.salaryType === SalaryType.RANGE && !data.salaryMin) {
        return false;
      }
      return true;
    },
    {
      message: 'Lương tối thiểu không được để trống',
      path: ['salaryMin'],
    },
  )
  .refine(
    (data) => {
      if (data.salaryType === SalaryType.RANGE && !data.salaryMax) {
        return false;
      }
      return true;
    },
    {
      message: 'Lương tối đa không được để trống',
      path: ['salaryMax'],
    },
  )
  .refine(
    (data) => {
      if (data.description === '<p></p>') {
        return false;
      }
      return true;
    },
    {
      message: 'Mô tả công việc không được để trống',
      path: ['description'],
    },
  )
  .refine(
    (data) => {
      if (data.requirement === '<p></p>') {
        return false;
      }
      return true;
    },
    {
      message: 'Yêu cầu công việc không được để trống',
      path: ['requirement'],
    },
  )
  .refine(
    (data) => {
      if (data.benefit === '<p></p>') {
        return false;
      }
      return true;
    },
    {
      message: 'Lợi ích không được để trống',
      path: ['benefit'],
    },
  )
  .refine(
    (data) => {
      // less than 60 days
      const expiredAt = new Date(data.expiredAt);
      const now = new Date();
      const diffTime = Math.abs(expiredAt.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const check = diffDays <= 60;
      return check;
    },
    {
      message: 'Tối đa 60 ngày',
      path: ['expiredAt'],
    },
  )
  .refine(
    (data) => {
      const expiredAt = new Date(data.expiredAt);
      const now = new Date();
      const check = expiredAt > now;
      return check;
    },
    {
      message: 'Ngày hết hạn phải lớn hơn ngày hiện tại',
      path: ['expiredAt'],
    },
  );
export type UpdateJobFormSchema = z.infer<typeof formSchema>;

interface IProps {
  job: IJob;
}
export default function EditJob({ job }: IProps) {
  const form = useForm<UpdateJobFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: job.title || '',
      salaryType: job.salaryType || '',
      salaryMin: job.salaryMin?.toString() || '',
      salaryMax: job.salaryMax?.toString() || '',
      addressIds: job.addresses.map((address) => address.id),
      jobLevel: job.jobLevel || '',
      jobType: job.jobType || '',
      jobExpertise: job.jobExpertise || '',
      jobDomain: job.jobDomain || '',
      description: job.description || '',
      requirement: job.requirement || '',
      benefit: job.benefit || '',
      expiredAt: job.expiredAt ? format(new Date(job.expiredAt), 'yyyy-MM-dd') : '',
      skills: job.skills.map((skill) => ({ value: skill.id, label: skill.name })) || [],
    },
  });

  const { mutate: updatePublishedJob, isPending: isUpdatingPublishedJob } = useUpdatePublishedJob({ id: job.id, form });
  const onSubmit = (data: UpdateJobFormSchema) => {
    updatePublishedJob({
      ...data,
      skillIds: data.skills.map((skill) => skill.value),
    });
  };

  return (
    <main className="px-4">
      <div className="text-center">
        <div className="inline-flex text-green items-center gap-2">
          <Rocket />
          <h3 className="text-2xl font-bold">Chỉnh sửa tin tuyển dụng</h3>
        </div>
        {/* <p className="text-muted-foreground">Chỉnh sửa tin tuyển dụng chi tiết và chuyên nghiệp</p> */}
      </div>
      <Form {...form}>
        <form className="max-w-4xl mx-auto space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormProvider {...form}>
            <CreateJobInfo />
            <CreateJobDescription />
            <CreateJobRequirement />
            <CreateJobBenefit />
            <div className="flex justify-center mb-4 gap-2">
              <Button
                type="submit"
                className="bg-green hover:bg-green/80 dark:text-white"
                disabled={isUpdatingPublishedJob}
              >
                {isUpdatingPublishedJob ? 'Đang cập nhật...' : 'Cập nhật tin tuyển dụng'}
              </Button>
            </div>
          </FormProvider>
        </form>
      </Form>
    </main>
  );
}
