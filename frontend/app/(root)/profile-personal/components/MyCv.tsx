'use client';
import CvItem from './CvItem';
import CreateCv from './CreateCv';
import useGetMyCv from '../hooks/useGetMyCv';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonCvItem() {
  return (
    <li className="mb-4 p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <Skeleton className=" size-[40px] " />
        <div className=" flex-1">
          <Skeleton className="w-full h-5 mb-1 " />
          <Skeleton className="h-4 w-8 " />
        </div>
      </div>
    </li>
  );
}

function SkeletonMyCv() {
  return (
    <div className="container mx-auto lg:w-62 px-4 lg:px-0 mb-[30px]">
      <Skeleton className="h-10 w-full mb-2" />
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
    <div className="container mx-auto lg:w-62 px-4 lg:px-0 mb-[30px]">
      <h3 className="text-2xl font-bold mb-2">Cv của tôi</h3>
      <ul className="  ">
        {myCvs?.map((cv) => <CvItem key={cv.id} cv={cv} />)}
        <CreateCv countCv={myCvs?.length || 0} />
      </ul>
    </div>
  );
}
