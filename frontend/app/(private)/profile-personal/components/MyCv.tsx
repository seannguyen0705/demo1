'use client';
import CvItem from './CvItem';
import CreateCv from './CreateCv';
import useGetMyCv from '../hooks/useGetMyCv';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonCvItem() {
  return (
    <li className="mb-4 rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <Skeleton className=" size-[40px] " />
        <div className=" flex-1">
          <Skeleton className="mb-1 h-5 w-full " />
          <Skeleton className="h-4 w-8 " />
        </div>
      </div>
    </li>
  );
}

function SkeletonMyCv() {
  return (
    <div className="container mx-auto mb-[30px] px-4 lg:w-62 lg:px-0">
      <Skeleton className="mb-2 h-10 w-full" />
      <ul>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCvItem key={index} />
        ))}
      </ul>
    </div>
  );
}

export default function MyCv() {
  const { myCvs, isLoading } = useGetMyCv();
  if (isLoading) {
    return <SkeletonMyCv />;
  }
  return (
    <div className="container mx-auto mb-[30px] px-4 lg:w-62 lg:px-0">
      <div>
        <h3 className="mb-2 text-2xl font-bold">Cv của tôi</h3>
        <ul className="">
          {myCvs?.map((cv) => <CvItem key={cv.id} cv={cv} />)}
          <CreateCv countCv={myCvs?.length || 0} />
        </ul>
      </div>
    </div>
  );
}
