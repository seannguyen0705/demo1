import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center mt-[30px] flex-col gap-2 h-[calc(100vh-120px)]">
      <h3>Không tìm thấy công việc yêu cầu</h3>
      <Image src="/job-not-found.png" alt="not found job" width={300} height={300} />
    </div>
  );
}
