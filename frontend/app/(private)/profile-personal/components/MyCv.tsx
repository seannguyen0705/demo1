import { getMyCv } from '@/api/cv/query';
import CvItem from './CvItem';
import CreateCv from './CreateCv';
export default async function MyCv() {
  const myCvs = await getMyCv();

  return (
    <div className="container mx-auto lg:w-62 px-4 lg:px-0 mb-[30px]">
      <h3 className="text-2xl font-bold mb-2">Cv của tôi</h3>
      <ul className="  ">
        {myCvs.data.map((cv) => (
          <CvItem key={cv.id} cv={cv} />
        ))}
        <CreateCv countCv={myCvs.data.length} />
      </ul>
    </div>
  );
}
