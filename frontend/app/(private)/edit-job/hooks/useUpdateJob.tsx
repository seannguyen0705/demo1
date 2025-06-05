import { updateJob } from '@/api/job/action';
import { IUpdateJob } from '@/api/job/interface';
import EXCEPTION_CODE from '@/utils/constants/exception';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { UpdateJobFormSchema } from '../[id]/EditJobForm';

interface IProps {
  id: string;
  form: UseFormReturn<UpdateJobFormSchema>;
}
export default function useUpdateJob({ id, form }: IProps) {
  return useMutation({
    mutationFn: (data: IUpdateJob) => updateJob(id, data),
    onSuccess: (data: object) => {
      if (!isErrorResponse(data)) {
        toast.success('Cập nhật tin tuyển dụng thành công');
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
