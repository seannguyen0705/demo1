import { UseFormReturn } from 'react-hook-form';
import { CreateJobFormSchema } from '../page';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SalaryType } from '@/utils/enums';
import RadioSalaryType from './RadioSalaryType';
import { useState } from 'react';
import SelectJobType from './SelectJobType';
import SelectSalaryUnit from './SelectSalaryUnit';
import AddSkill from './AddSkill';
import SelectProvince from '@/components/SelectProvince';
interface IProps {
  form: UseFormReturn<CreateJobFormSchema>;
}

export default function CreateJobInfo({ form }: IProps) {
  const [salaryType, setSalaryType] = useState('');
  const disabledSalaryMin = salaryType === SalaryType.NEGOTIATION || salaryType === SalaryType.UPTO;
  const disabledSalaryMax = salaryType === SalaryType.NEGOTIATION || salaryType === SalaryType.ATLEAST;

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
        name="addresses"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel className=" flex items-center justify-between">Địa chỉ làm việc</FormLabel>
            <div className="space-y-2">
              {field.value.map((_, index) => (
                <div key={index} className="">
                  <FormControl>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <SelectProvince
                        provinceId={field.value[index].provinceId}
                        onChange={(provinceId) => {
                          const newValue = [...field.value];
                          newValue[index].provinceId = provinceId;
                          field.onChange(newValue);
                        }}
                      />
                      <div className="flex items-center gap-2">
                        <Input
                          className="flex-1 w-full"
                          placeholder="Địa chỉ cụ thể tại tỉnh/thành"
                          value={field.value[index].detail}
                          onChange={(e) => {
                            const newValue = [...field.value];
                            newValue[index].detail = e.target.value;
                            field.onChange(newValue);
                          }}
                        />
                        {field.value.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              const newValue = field.value.filter((_, i) => i !== index);
                              field.onChange(newValue);
                            }}
                          >
                            <Minus />
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormControl>
                </div>
              ))}
              {field.value.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed border-green"
                  onClick={() => {
                    field.onChange([...field.value, { provinceId: '', detail: '' }]);
                  }}
                >
                  <Plus /> Thêm địa chỉ
                </Button>
              )}
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
        name="salaryUnit"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Đơn vị lương</FormLabel>
            <FormControl>
              <SelectSalaryUnit
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
