import useGetProvince from '@/app/hooks/useGetProvince';
import CheckBox from '@/components/Checkbox';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface IProps {
  provinceName: string;
  onChange: (value: string) => void;
}

export default function ProvinceFilterSmall({ provinceName, onChange }: IProps) {
  const { data: provinces, isLoading } = useGetProvince();
  const [search, setSearch] = useState('');
  if (!provinces || isLoading) {
    return;
  }
  const handleChange = (value: string) => {
    if (provinceName === value) {
      onChange('');
    } else {
      onChange(value);
    }
  };

  const filteredProvinces = provinces.filter((province) => province.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="border-b pb-2 mb-2">
      <h3 className="mb-2">Tỉnh/Thành phố</h3>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="w-full border rounded-md mb-1"
        placeholder="Tìm kiếm tỉnh/thành..."
      />

      <ul className="grid grid-cols-2 h-auto max-h-[200px] sm:max-h-[300px] overflow-auto gap-2">
        {filteredProvinces?.map((province) => (
          <li
            onClick={() => handleChange(province.name)}
            key={province.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <CheckBox checked={provinceName === province.name} />
            {province.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
