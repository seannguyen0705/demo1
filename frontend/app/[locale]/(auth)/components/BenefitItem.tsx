interface IProps {
  title: string;
  description: string;
}

export default function BenefitItem({ title, description }: IProps) {
  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 p-1">
            <svg
              className="h-4 w-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
