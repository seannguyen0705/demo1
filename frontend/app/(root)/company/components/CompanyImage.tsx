'use client';
import { ICompanyImage } from '@/api/company-image/interface';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { DialogTitle } from '@radix-ui/react-dialog';

interface IProps {
  companyImages: ICompanyImage[];
}

export default function CompanyImage({ companyImages }: IProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        {companyImages.slice(0, 3).map((image, index) => (
          <ImageGalleryItem key={image.id} index={index} image={image} allImages={companyImages} />
        ))}
      </div>
    </div>
  );
}

function ImageGalleryItem({
  image,
  allImages,
  index,
}: {
  image: ICompanyImage;
  allImages: ICompanyImage[];
  index: number;
}) {
  const [activeIndex] = useState(allImages.findIndex((img) => img.id === image.id));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full h-[60px] sm:h-[100px] md:h-[80px] lg:h-[200px] cursor-pointer overflow-hidden rounded-md">
          <Image src={image.url} alt="Company image" fill className="object-cover transition-transform w-full h-auto" />
          {index === 2 && allImages.length > 3 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white text-center">+ {allImages.length - 3}</p>
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogTitle hidden></DialogTitle>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          initialSlide={activeIndex}
          className="w-full aspect-video"
        >
          {allImages.map((img) => (
            <SwiperSlide className="w-full h-full" key={img.id}>
              <div className="relative z-0 w-full h-full">
                <Image src={img.url} alt="Company image" fill className="object-cover w-full h-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
}
