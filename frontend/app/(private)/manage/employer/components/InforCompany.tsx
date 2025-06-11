'use client';

import Link from 'next/link';
import { Building2, MapPin, Globe, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ICompany } from '@/api/company/interface';

interface CompanyInfoProps {
  name: string;
  address: string;
  website: string;
  onViewProof?: () => void;
  onViewDetails?: () => void;
}

interface IProps {
  company: ICompany;
}
export default function InforCompany({ company }: IProps) {
  const { name, addresses, website, proof } = company;
  return (
    <section className="w-full">
      <div className="container">
        <h2 className="text-2xl font-bold tracking-tight my-6 text-center md:text-2xl">Thông Tin Công Ty</h2>

        <Card className="max-w-3xl mx-auto bg-light-green dark:bg-gray-900">
          <CardContent className="">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <p className="">{name}</p>
                </div>
              </div>

              {addresses.map((address) => (
                <div key={address.id} className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="">{`${address.detail}, ${address.province.name}`}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <Link
                    href={website}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {website}
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href={proof.url} target="_blank" className="">
              <Button className="w-full bg-green hover:bg-green/80 sm:w-auto">
                <FileText className="mr-2 h-4 w-4" />
                Xem Minh Chứng
              </Button>
            </Link>

            <Link href={`/company/${name}`} target="_blank">
              <Button variant="outline" className="w-full sm:w-auto">
                <Info className="mr-2 h-4 w-4" />
                Xem Chi Tiết
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
