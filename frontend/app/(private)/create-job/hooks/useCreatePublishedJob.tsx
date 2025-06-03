import { createPublishedJob } from '@/api/job/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import { CreateJobFormSchema } from '../page';
import EXCEPTION_CODE from '@/utils/constants/exception';
interface IProps {
  form: UseFormReturn<CreateJobFormSchema>;
}

export default function useCreatePublishedJob({ form }: IProps) {
  return useMutation({
    mutationFn: createPublishedJob,
    onSuccess: (data: object) => {
      if (!isErrorResponse(data)) {
        toast.success('Đăng tin tuyển dụng thành công');
      } else {
        if (data.errorCode === EXCEPTION_CODE.JOB_ALREADY_EXISTS_CODE) {
          form.setError('title', {
            message: 'Bạn đã đăng tin tuyển dụng với tên công việc này rồi',
          });
          form.setFocus('title');
        } else {
          toast.error(data.message);
        }
      }
    },
  });
}
