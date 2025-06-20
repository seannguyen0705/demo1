import Image from 'next/image';

interface IProps {
  title?: string;
}

export default function NotFoundJob({ title }: IProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h3>{title || 'Không tìm thấy kết quả phù hợp'}</h3>
      <Image src="/job-not-found.png" alt="not found job" width={300} height={300} />
    </div>
  );
}
