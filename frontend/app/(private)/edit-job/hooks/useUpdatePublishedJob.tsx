import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePublishedJob } from '@/api/job/action';

import { IUpdatePublishedJob } from '@/api/job/interface';
import { UseFormReturn } from 'react-hook-form';
import { UpdateJobFormSchema } from '../[id]/EditJobForm';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';
import EXCEPTION_CODE from '@/utils/constants/exception';
import { useRouter } from 'next/navigation';

interface IProps {
  id: string;
  form: UseFormReturn<UpdateJobFormSchema>;
}

export default function useUpdatePublishedJob({ id, form }: IProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: IUpdatePublishedJob) => updatePublishedJob(id, data),
    onSuccess: (data) => {
      if (isErrorResponse(data)) {
        if (data.errorCode === EXCEPTION_CODE.JOB_ALREADY_EXISTS_CODE) {
          form.setError('title', {
            message: 'Bạn đã đăng tin tuyển dụng với tên công việc này rồi',
          });
          form.setFocus('title');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data: job } = data;
        queryClient.invalidateQueries({ queryKey: ['manage-jobs'] });
        queryClient.invalidateQueries({ queryKey: ['job', id] });
        router.push(`/job/${job.id}`);
        toast.success('Cập nhật tin tuyển dụng thành công');
      }
    },
  });
}
