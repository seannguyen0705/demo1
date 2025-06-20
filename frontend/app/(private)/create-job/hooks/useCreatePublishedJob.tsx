import { createPublishedJob } from '@/api/job/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import { CreateJobFormSchema } from '../components/FormCreateJob';
import EXCEPTION_CODE from '@/utils/constants/exception';
import { useRouter } from 'next/navigation';
interface IProps {
  form: UseFormReturn<CreateJobFormSchema>;
}

export default function useCreatePublishedJob({ form }: IProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createPublishedJob,
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
        router.push(`/job/${job.id}`);
        toast.success('Đăng tin tuyển dụng thành công');
      }
    },
  });
}
