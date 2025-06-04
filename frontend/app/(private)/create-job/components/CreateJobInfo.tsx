import { useFormContext } from 'react-hook-form';
import { CreateJobFormSchema } from '../page';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SalaryType } from '@/utils/enums';
import RadioSalaryType from './RadioSalaryType';
import { useState } from 'react';
import SelectJobType from './SelectJobType';
import AddSkill from './AddSkill';
import SelectJobLevel from './SelectJobLevel';
import useGetCompanyAddresses from '../hooks/useGetCompanyAddresses';
import CheckBox from '@/components/Checkbox';

export default function CreateJobInfo() {
  const form = useFormContext<CreateJobFormSchema>();
  const [salaryType, setSalaryType] = useState('');
  const disabledSalaryMin = salaryType === SalaryType.NEGOTIATION || salaryType === SalaryType.UPTO;
  const disabledSalaryMax = salaryType === SalaryType.NEGOTIATION || salaryType === SalaryType.ATLEAST;

  const { data: companyAddresses } = useGetCompanyAddresses();
  if (!companyAddresses) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Tên công việc</FormLabel>
            <FormControl>
              <Input className="selection:bg-green" placeholder="Ex: Thực tập sinh lập trình" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="addressIds"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel className="text-base font-medium mb-3">Địa chỉ làm việc</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {companyAddresses.data.map((companyAddress) => (
                <div
                  onClick={() => {
                    if (field.value.includes(companyAddress.address.id)) {
                      field.onChange(field.value.filter((id) => id !== companyAddress.address.id));
                    } else {
                      field.onChange([...field.value, companyAddress.address.id]);
                    }
                  }}
                  key={companyAddress.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    field.value.includes(companyAddress.address.id) ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <CheckBox checked={field.value.includes(companyAddress.address.id)} />
                  <p className="text-sm">
                    {companyAddress.address.detail}, {companyAddress.address.province.name}
                  </p>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="salaryType"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Loại lương</FormLabel>
            <FormControl>
              <RadioSalaryType
                value={salaryType}
                onChange={(value) => {
                  setSalaryType(value);
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        disabled={disabledSalaryMin}
        control={form.control}
        name="salaryMin"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className={`${disabledSalaryMin && 'text-gray-400'}`}>Mức lương tối thiểu</FormLabel>
            <FormControl>
              <Input type="number" className="selection:bg-green" placeholder="Ex: 10.000.000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        disabled={disabledSalaryMax}
        control={form.control}
        name="salaryMax"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className={`${disabledSalaryMax && 'text-gray-400'}`}>Mức lương tối đa</FormLabel>
            <FormControl>
              <Input type="number" className="selection:bg-green" placeholder="Ex: 10.000.000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobType"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Loại công việc</FormLabel>
            <FormControl>
              <SelectJobType
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobLevel"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Cấp bậc công việc</FormLabel>
            <FormControl>
              <SelectJobLevel
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobExpertise"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Chuyên môn</FormLabel>
            <FormControl>
              <Input className="selection:bg-green" placeholder="Ex: Kĩ sư phần mềm" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobDomain"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Lĩnh vực</FormLabel>
            <FormControl>
              <Input className="selection:bg-green" placeholder="Ex: Công nghệ thông tin" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="skillIds"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Kĩ năng</FormLabel>
            <FormControl>
              <AddSkill
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
