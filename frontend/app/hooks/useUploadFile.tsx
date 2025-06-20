import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import axiosInstance from '@/config/axios-config';
import { IFile } from '@/api/file/interface';

async function uploadFile({ file, folder }: { file: Blob; folder: string }) {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance.post<{ data: IFile }>(`file/${folder}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export default function useUploadFile() {
  const [fileId, setFileId] = useState('');
  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (response) => {
      setFileId(response.data.data.id);
    },
    onError: () => {
      toast.error('Upload file thất bại');
    },
  });
  return {
    fileId,
    ...mutation,
  };
}
