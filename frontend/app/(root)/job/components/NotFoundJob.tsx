import Image from 'next/image';
export default function NotFoundJob() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h3>Không tìm thấy kết quả phù hợp</h3>
      <Image src="/job-not-found.png" alt="not found job" width={300} height={300} />
    </div>
  );
}
