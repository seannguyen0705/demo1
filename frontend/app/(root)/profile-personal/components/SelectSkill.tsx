'use client';

import * as React from 'react';
import { ChevronDown, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useGetSkill from '../hooks/useGetSkill';
import { ISkillResponse } from '@/api/skill/interface';

interface IProps {
  onChange: (skill: { value: string; label: string }) => void;
  skill: { value: string; label: string };
}
export default function SelectSkill({ onChange, skill }: IProps) {
  const [open, setOpen] = React.useState(false);

  const [keyword, setKeyword] = React.useState('');

  const { data, isLoading } = useGetSkill({
    page: 1,
    limit: 5,
    keyword,
  });

  const skillLists = (
    data as { data: ISkillResponse } | undefined
  )?.data.skills.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {skill?.label ? (
            <p>{skill.label}</p>
          ) : (
            <p className="text-gray-500">Chọn kĩ năng</p>
          )}
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
          {skillLists?.map((skill) => (
            <li className="p-2 hover:bg-gray-100" key={skill.value}>
              <button
                className="w-full text-left"
                onClick={() => {
                  setOpen(false);
                  onChange(skill);
                }}
              >
                {skill.label}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
