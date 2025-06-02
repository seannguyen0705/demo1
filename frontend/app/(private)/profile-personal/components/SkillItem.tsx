'use client';
import { ICandidateSkill } from '@/api/candidate-skill/interface';
import { X } from 'lucide-react';
import useDeleteCandidateSkill from '../hooks/useDeleteCandidateSkill';
interface IProps {
  candidateSkill: ICandidateSkill;
}
export default function SkillItem({ candidateSkill }: IProps) {
  const { mutate: deleteCandidateSkill, isPending } = useDeleteCandidateSkill();
  return (
    <article className="flex items-center gap-2 dark:bg-gray-800 bg-green rounded-2xl border text-white border-gray-200 px-2 py-1">
      <span className="text-sm font-bold">{candidateSkill.skill.name}</span>
      <span className="text-sm">({candidateSkill.skillYear})</span>
      <button
        disabled={isPending}
        onClick={() => deleteCandidateSkill(candidateSkill.id)}
        className="ml-auto disabled:opacity-50"
      >
        <X />
      </button>
    </article>
  );
}
