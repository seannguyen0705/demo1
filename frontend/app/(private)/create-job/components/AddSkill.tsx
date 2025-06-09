import { useEffect, useState } from 'react';
import SelectSkill from '../../profile-personal/components/SelectSkill';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
interface IProps {
  skills: { value: string; label: string }[];
  onChange: (value: { value: string; label: string }[]) => void;
}

export default function AddSkill({ skills, onChange }: IProps) {
  const [skill, setSkill] = useState({ value: '', label: '' });
  // const [skillList, setSkillList] = useState<{ value: string; label: string }[]>(skills);
  const handleAddSkill = () => {
    if (skill.value) {
      onChange([...skills, skill]);
      setSkill({ value: '', label: '' });
    }
  };
  const handleRemoveSkill = (value: string) => {
    onChange(skills.filter((item) => item.value !== value));
  };

  // useEffect(() => {
  //   onChange(skillList.map((item) => item.value));
  // }, [skillList]);
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div className="w-full">
        <SelectSkill
          skill={skill}
          onChange={(value) => setSkill(value)}
          excludeSkillIds={skills.map((item) => item.value)}
        />
      </div>
      <Button
        disabled={skills.length >= 10}
        type="button"
        className="bg-green text-white hover:bg-green hover:opacity-80"
        onClick={handleAddSkill}
      >
        Thêm
      </Button>

      <p className="text-sm text-muted-foreground">Đã chọn {skills.length}/10 kĩ năng</p>

      <ul className="col-span-2 flex flex-wrap gap-2">
        {skills.map((item) => (
          <li key={item.value}>
            <SkillItem skill={item} onRemove={handleRemoveSkill} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillItem({
  skill,
  onRemove,
}: {
  skill: { value: string; label: string };
  onRemove: (value: string) => void;
}) {
  return (
    <article className="flex items-center gap-2 dark:bg-gray-800 bg-[#309689] rounded-2xl border text-white border-gray-200 px-2 py-1">
      <span className="text-sm font-bold">{skill.label}</span>
      <button type="button" className="ml-auto disabled:opacity-50" onClick={() => onRemove(skill.value)}>
        <X />
      </button>
    </article>
  );
}
