'use client';

import { UseFormReturn } from 'react-hook-form';
import { CreateJobFormSchema } from '../page';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Editor from '@/components/Editor';

interface IProps {
  form: UseFormReturn<CreateJobFormSchema>;
}

export default function CreateJobBenefit({ form }: IProps) {
  return (
    <div>
      <FormField
        control={form.control}
        name="benefit"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Phúc lợi và chính sách</FormLabel>
            <FormControl className="">
              <Editor value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
