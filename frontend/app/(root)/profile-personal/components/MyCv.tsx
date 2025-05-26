'use client';
import CvItem from './CvItem';
import CreateCv from './CreateCv';
import useGetMyCv from '../hooks/useGetMyCv';
export default function MyCv() {
  const { myCvs, isLoading } = useGetMyCv();

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
