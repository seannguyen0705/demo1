import DialogProfile from './DialogProfile';

interface IProps {
  employerId: string;
}
export default function ActionEmployer({ employerId }: IProps) {
  console.log({ employerId });
  return (
    <div>
      <DialogProfile employerId={employerId} />
    </div>
  );
}
