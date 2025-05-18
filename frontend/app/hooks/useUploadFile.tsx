import { uploadFile } from '@/api/file/action';
import { useMutation } from '@tanstack/react-query';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useUploadFile() {
  const [fileId, setFileId] = useState('');
  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        setFileId(data.data.id);
      }
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
