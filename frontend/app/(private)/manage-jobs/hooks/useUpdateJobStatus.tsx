import { updateJobStatus } from '@/api/job/action';
import { JobStatus } from '@/utils/enums';
import { useMutation } from '@tanstack/react-query';

import { useQueryClient } from '@tanstack/react-query';

interface IProps {
  id: string;
}

export default function useUpdateJobStatus({ id }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: JobStatus) => updateJobStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manage-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', id] });
    },
  });
}
