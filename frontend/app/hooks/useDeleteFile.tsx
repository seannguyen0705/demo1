import { useMutation } from '@tanstack/react-query';

import axiosInstance from '@/config/axios-config';

async function deleteFile(id: string) {
  return axiosInstance.delete(`file/${id}`);
}

export default function useDeleteFile() {
  return useMutation({
    mutationFn: deleteFile,
  });
}
