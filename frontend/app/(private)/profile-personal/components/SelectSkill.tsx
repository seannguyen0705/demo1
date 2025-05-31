'use client';

import * as React from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useGetSkill from '../hooks/useGetSkill';

interface IProps {
  onChange: (skill: { value: string; label: string }) => void;
  skill: { value: string; label: string };
  excludeSkillIds: string[];
}
export default function SelectSkill({ onChange, skill, excludeSkillIds = [] }: IProps) {
  const [open, setOpen] = React.useState(false);

  const [keyword, setKeyword] = React.useState('');

  const { data } = useGetSkill({
    page: 1,
    limit: 5,
    keyword,
    excludeSkillIds,
  });

  const skillLists = data?.data.skills.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {skill?.label ? <p>{skill.label}</p> : <p className="text-gray-500 dark:text-gray-200">Chọn kĩ năng</p>}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 ">
        <div className="flex items-center gap-2 border p-2 ">
          <Search className="w-4 h-4" />
          <input
            className="outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm kiếm kĩ năng..."
          />
        </div>

        <ul>
          {skillLists?.map((item) => (
            <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800" key={item.value}>
              <button
                className="w-full text-left flex items-center justify-between"
                onClick={() => {
                  setOpen(false);
                  onChange(item);
                }}
              >
                {item.label}
                {item.value === skill.value && <Check className="w-4 h-4" />}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
