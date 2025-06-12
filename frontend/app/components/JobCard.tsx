import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Clock, DollarSign, Briefcase, Heart, Share2 } from 'lucide-react';
import { IJob } from '@/api/job/interface';
import { vi } from 'date-fns/locale';
import getShortStringSalary from '@/utils/helpers/getShortStringSalary';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface IProps {
  job: IJob;
}

export default function JobCard({ job }: IProps) {
  const { company, addresses } = job;
  const { logo } = company;
  const firstProvinceName = addresses[0].province.name;
  return (
    <Card className="w-full relative h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/company/${job.company.name}`} className="relative z-10">
              <Avatar className="h-12 w-12">
                <AvatarImage src={logo?.url || '/default_logo.png'} alt="Company Logo" />
                <AvatarFallback className="bg-blue-100 text-gray-600 font-semibold">
                  {job.company.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link
                href={`/job/${job.id}`}
                className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1 relative hover:text-green z-10"
              >
                {job.title}
              </Link>
              <Link
                href={`/company/${job.company.name}`}
                className="text-sm text-gray-600 dark:text-white hover:underline relative z-10"
              >
                {job.company.name}
              </Link>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Link
            href={`/job?provinceName=${firstProvinceName}`}
            className="flex items-center gap-2 text-gray-600 dark:text-white hover:underline relative z-10"
          >
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{firstProvinceName}</span>
          </Link>
          <Link
            href={`/job?jobType=${job.jobType}`}
            className="flex items-center gap-2 text-gray-600 dark:text-white hover:underline relative z-10"
          >
            <Briefcase className="h-4 w-4 text-gray-400" />
            <span>{job.jobType}</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-600 dark:text-white">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span>{getShortStringSalary(job.salaryType, job.salaryMin, job.salaryMax)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-white">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: vi })}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge variant="secondary" className="text-xs" key={skill.id}>
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Link href={`/job/${job.id}`} className="flex gap-2 w-full relative z-10">
          <Button className="flex-1 bg-green hover:bg-green/80 " size="sm">
            Ứng tuyển ngay
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
      <Link href={`/job/${job.id}`} className="absolute inset-0"></Link>
    </Card>
  );
}
