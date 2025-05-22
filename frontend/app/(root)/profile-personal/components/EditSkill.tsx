'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { DialogTrigger } from '@/components/ui/dialog';
import { FiPlusCircle } from 'react-icons/fi';
import { useState } from 'react';
import SelectSkill from './SelectSkill';
import { useCreateCandidateSkill } from '../hooks/useCreateCandidateSkill';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectExp from './SelectExp';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import MySkill from './MySkill';
import { ICandidateSkill } from '@/api/candidate-skill/interface';

const schema = z.object({
  skill: z.object({
    value: z.string().min(1, 'Vui lòng chọn kĩ năng'),
    label: z.string().min(1, 'Vui lòng chọn kĩ năng'),
  }),
  skillYear: z.string().min(1, 'Vui lòng chọn năm kinh nghiệm'),
});

interface IProps {
  candidateSkills: ICandidateSkill[];
}
export default function EditSkill({ candidateSkills }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createCandidateSkill } = useCreateCandidateSkill();
  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      skill: {
        value: '',
        label: '',
      },
      skillYear: '',
    },
  });
  const [skillYear, setSkillYear] = useState('');

  const handleCreateSkill = (data: z.infer<typeof schema>) => {
    createCandidateSkill(
      {
        skillId: data.skill.value,
        skillYear: data.skillYear,
      },
      {
        onSuccess: (data: object) => {
          if (!isErrorResponse(data)) {
            reset();
            setSkillYear('');
          }
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-[10px] right-[10px]" variant="outline">
          <FiPlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Giới thiệu bản thân</DialogTitle>
          <DialogDescription>
            Giới thiệu điểm mạnh và số năm kinh nghiệm của bạn
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SelectSkill
              skill={getValues('skill')}
              onChange={(value) => {
                setValue('skill.value', value.value);
                setValue('skill.label', value.label);
              }}
            />
            {errors.skill?.value && (
              <p className="text-sm text-red-500">Vui lòng chọn kĩ năng</p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <SelectExp
                skillYear={skillYear}
                onChange={(value) => {
                  setSkillYear(value);
                  setValue('skillYear', value);
                }}
              />
              <Button
                onClick={handleSubmit(handleCreateSkill)}
                className="bg-[#309689] hover:bg-[#309689] hover:opacity-80 disabled:opacity-50"
              >
                <FiPlusCircle />
              </Button>
            </div>
            {errors.skillYear && (
              <p className="text-sm text-red-500">
                Vui lòng chọn năm kinh nghiệm
              </p>
            )}
          </div>
        </div>
        <MySkill candidateSkills={candidateSkills} />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
