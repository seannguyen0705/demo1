'use client';

import { SalaryType } from '@/utils/enums';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import CreateJobInfo from './components/CreateJobInfo';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateJobDescription from './components/CreateJobDescription';
import CreateJobRequirement from './components/CreateJobRequirement';
import CreateJobBenefit from './components/CreateJobBenefit';
import useGetMe from '@/app/hooks/useGetMe';
import useCreatePublishedJob from './hooks/useCreatePublishedJob';
import useCreateDraftJob from './hooks/useCreateDraftJob';
import removeFalsyValues from '@/utils/helpers/removeFalsyValues';
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
    addresses: z.array(
      z.object({
        detail: z.string().min(1, 'Địa chỉ công ty phải có ít nhất 1 ký tự'),
        provinceId: z.string().min(1, 'Tỉnh/thành phố không được để trống'),
      }),
    ),
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
    skillIds: z.array(z.string()).min(1, {
      message: 'Kỹ năng không được để trống',
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
  );

export type CreateJobFormSchema = z.infer<typeof formSchema>;

export default function CreateJob() {
  const form = useForm<CreateJobFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      salaryType: '',
      salaryMin: '',
      salaryMax: '',
      addresses: [
        {
          detail: '',
          provinceId: '',
        },
      ],
      jobLevel: '',
      jobType: '',
      jobExpertise: '',
      jobDomain: '',
      description: '',
      requirement: '',
      benefit: '',
      skillIds: [],
    },
  });
  const { user } = useGetMe();
  const { mutate: publishJob, isPending: isPendingPublish } = useCreatePublishedJob({
    form,
  });
  const { mutate: createDraftJob, isPending: isPendingDraft } = useCreateDraftJob({
    form,
  });
  const onSubmit = (data: CreateJobFormSchema) => {
    if (user?.company?.id) {
      publishJob({
        ...data,
        companyId: user.company.id,
      });
    }
  };

  const handleCreateDraftJob = () => {
    const data = removeFalsyValues(form.getValues());
    if (data.addresses) {
      data.addresses = data.addresses.filter((address) => address.detail && address.provinceId);
    }
    if (user?.company?.id) {
      createDraftJob({
        ...data,
        companyId: user.company.id,
      });
    }
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
          <CreateJobInfo form={form} />
          <CreateJobDescription form={form} />
          <CreateJobRequirement form={form} />
          <CreateJobBenefit form={form} />
          <div className="flex justify-center mb-4 gap-2">
            <Button type="submit" className="bg-green hover:bg-green/80 dark:text-white" disabled={isPendingPublish}>
              {isPendingPublish ? 'Đang đăng tin...' : 'Đăng tin tuyển dụng'}
            </Button>
            <Button
              variant="outline"
              onClick={handleCreateDraftJob}
              className="border-green dark:border-green"
              type="button"
              disabled={isPendingDraft}
            >
              {isPendingDraft ? 'Đang lưu bản nháp...' : 'Lưu bản nháp'}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
