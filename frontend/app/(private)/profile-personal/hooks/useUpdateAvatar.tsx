import { IFile } from '@/apiService/file/interface';
import axiosInstance from '@/config/axios-config';
import { UserRole } from '@/utils/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProps {
  role?: UserRole;
}
export default function useUpdateAvatar({ role }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: role === UserRole.EMPLOYER ? updateEmployerAvatar : updateCandidateAvatar,
    onSuccess: () => {
      toast.success('Cập nhật ảnh đại diện thành công');
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: () => {
      toast.error('Cập nhật ảnh đại diện thất bại');
    },
  });
}

const updateCandidateAvatar = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.put<{ data: IFile }>(`candidates/me/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const updateEmployerAvatar = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.put<{ data: IFile }>(`employers/me/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
