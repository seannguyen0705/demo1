import { ICreateContact } from '@/api/contact/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
const createReport = async (data: ICreateContact) => {
  const reponse = await axiosInstance.post('/contacts', data);
  return reponse.data;
};

export default function useCreateReport() {
  return useMutation({
    mutationFn: createReport,

    onSuccess: () => {
      toast.success('Gửi báo cáo thành công. Vui lòng chờ phản hồi từ chúng tôi');
    },
    onError: () => {
      toast.error('Gửi báo cáo thất bại');
    },
  });
}
