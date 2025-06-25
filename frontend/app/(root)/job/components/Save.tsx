'use client';

import { IJob } from '@/apiService/job/interface';
import { Button } from '@/components/ui/button';
import useDeleteSaveJob from '../hooks/useDeleteSaveJob';
import useCreateSaveJob from '../hooks/useCreateSaveJob';
import { Heart } from 'lucide-react';

interface IProps {
  job: IJob;
}
export default function Save({ job }: IProps) {
  const { mutate: createSaveJob, isPending: isCreatingSaveJob } = useCreateSaveJob(job.id);
  const { mutate: deleteSaveJob, isPending: isDeletingSaveJob } = useDeleteSaveJob(job.id);
  return (
    <>
      {job.saveJobs.length > 0 ? (
        <Button
          disabled={isDeletingSaveJob}
          className="disabled:opacity-50"
          variant={'outline'}
          onClick={() => deleteSaveJob(job.saveJobs[0].id)}
        >
          <Heart className="fill-red-500 text-red-500" />
        </Button>
      ) : (
        <Button
          disabled={isCreatingSaveJob}
          className="disabled:opacity-50"
          variant={'outline'}
          onClick={() => createSaveJob({ jobId: job.id })}
        >
          <Heart />
        </Button>
      )}
    </>
  );
}
