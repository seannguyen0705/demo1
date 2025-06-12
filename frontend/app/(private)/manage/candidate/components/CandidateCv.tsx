import useGetCvByCandidateId from '../hooks/useGetCvByCandidateId';
import CvItem from './CvItem';

interface IProps {
  candidateId: string;
}
export default function CandidateCv({ candidateId }: IProps) {
  const { cvs, isLoading } = useGetCvByCandidateId(candidateId);
  return (
    <section className="">
      <h3 className="text-lg font-bold mb-3">Cv của ứng viên</h3>
      <ul className="flex flex-col gap-4 ">
        {cvs?.map((cv) => (
          <li key={cv.id}>
            <CvItem cv={cv} />
          </li>
        ))}
      </ul>
    </section>
  );
}
