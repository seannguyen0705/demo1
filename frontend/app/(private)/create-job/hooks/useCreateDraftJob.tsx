import { createDraftJob } from '@/api/job/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import EXCEPTION_CODE from '@/utils/constants/exception';
import { UseFormReturn } from 'react-hook-form';
import { CreateJobFormSchema } from '../components/FormCreateJob';

interface IProps {
  form: UseFormReturn<CreateJobFormSchema>;
}
export default function useCreateDraftJob({ form }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDraftJob,
    onSuccess: (data: object) => {
      if (!isErrorResponse(data)) {
        toast.success('Lưu bản nháp thành công');
        queryClient.invalidateQueries({ queryKey: ['manage-jobs'] });
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
