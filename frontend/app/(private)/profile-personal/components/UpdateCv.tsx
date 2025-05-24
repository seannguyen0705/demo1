'use client';
interface IProps {
  cvId: string;
  updateCv: (data: { id: string; file: Blob }) => void;
  disabled: boolean;
}
export default function UpdateCv({ cvId, updateCv, disabled }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateCv({ id: cvId, file });
    }
  };
  return (
    <label className="pb-1 flex flex-col items-center justify-center cursor-pointer">
      <input
        type="file"
        disabled={disabled}
        accept="application/pdf,application/msword"
        className="hidden"
        onChange={handleChange}
      />
      <span
        className={`block mt-[20px] text-sm mb-[15px] p-2 border rounded-md bg-[#309689] text-white ${disabled && 'opacity-50'}`}
      >
        Cập nhật
      </span>
    </label>
  );
}
