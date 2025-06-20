interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface IProps {
  contact: ContactItemProps;
}
export default function ContactItem({ contact }: IProps) {
  const { icon, title, description } = contact;
  return (
    <div className="flex items-center md:items-start  flex-col gap-y-1  ">
      <div className="text-primary">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className=" text-wrap text-center md:text-left text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
