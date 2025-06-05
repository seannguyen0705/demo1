'use client';

import { SalaryType } from '@/utils/enums';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { FormProvider } from 'react-hook-form';

import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

import useGetMe from '@/app/hooks/useGetMe';

import CreateJobInfo from '../../create-job/components/CreateJobInfo';
import CreateJobDescription from '../../create-job/components/CreateJobDescription';
import CreateJobRequirement from '../../create-job/components/CreateJobRequirement';
import CreateJobBenefit from '../../create-job/components/CreateJobBenefit';
import useUpdateJob from '../hooks/useUpdateJob';
import { IJob } from '@/api/job/interface';
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
    skills: z.array(z.object({ value: z.string(), label: z.string() })),
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
      addressIds: job.jobAddresses.map((jobAddress) => jobAddress.address.id),
      jobLevel: job.jobLevel || '',
      jobType: job.jobType || '',
      jobExpertise: job.jobExpertise || '',
      jobDomain: job.jobDomain || '',
      description: job.description || '',
      requirement: job.requirement || '',
      benefit: job.benefit || '',
      skills: job.jobSkills.map((jobSkill) => ({ value: jobSkill.skill.id, label: jobSkill.skill.name })) || [],
    },
  });

  const { mutate: updateJob, isPending } = useUpdateJob({ id: job.id, form });
  const onSubmit = (data: UpdateJobFormSchema) => {
    updateJob({
      ...data,
      skillIds: data.skills.map((skill) => skill.value),
    });
  };

  return (
    <main className="px-4">
      <div className="text-center">
        <div className="inline-flex text-green items-center gap-2">
          <Rocket />
          <h3 className="text-2xl font-bold">Đăng tin tuyển dụng</h3>
        </div>
        <p className="text-muted-foreground">Tạo tin tuyển dụng chi tiết và chuyên nghiệp</p>
      </div>
      <Form {...form}>
        <form className="max-w-4xl mx-auto space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormProvider {...form}>
            <CreateJobInfo />
            <CreateJobDescription />
            <CreateJobRequirement />
            <CreateJobBenefit />
            <div className="flex justify-center mb-4 gap-2">
              <Button type="submit" className="bg-green hover:bg-green/80 dark:text-white" disabled={false}>
                {false ? 'Đang cập nhật...' : 'Cập nhật tin tuyển dụng'}
              </Button>
            </div>
          </FormProvider>
        </form>
      </Form>
    </main>
  );
}
