import { useMutation } from '@tanstack/react-query';

import { deleteFile } from '@/api/file/action';

export default function useDeleteFile() {
  return useMutation({
    mutationFn: deleteFile,
  });
}
