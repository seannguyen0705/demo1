import { Check } from 'lucide-react';

interface IProps {
  checked: boolean;
}

export default function CheckBox({ checked }: IProps) {
  if (checked) {
    return (
      <div className="size-4 bg-green flex items-center justify-center rounded-xs">
        <Check color="white" />
      </div>
    );
  }
  return <div className="size-4 border rounded-xs"></div>;
}
