interface IProps {
  params: Promise<{ name: string }>;
}
export default async function CompanyPage({ params }: IProps) {
  const { name } = await params;
  return <div>{name}</div>;
}
