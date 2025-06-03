'use client';

import Link from 'next/link';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import useQueryJob from '@/app/(root)/job/hooks/useQueryJob';
interface IProps {
  totalPages: number;
  currentPage: number;
}
export default function Pagination({ totalPages, currentPage }: IProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const { createQueryString } = useQueryJob();

  return (
    <ul className=" flex items-center gap-x-2 justify-center">
      {currentPage > 1 && (
        <Link
          scroll={false}
          className="text-[#4D4D4D] hover:text-primary"
          href={`?${createQueryString('page', prevPage.toString())}`}
        >
          <FaChevronLeft />
        </Link>
      )}
      <NavItem currentPage={currentPage} pageNum={1} />
      {prevPage > 2 && (
        <div className=" flex py-2 px-4 items-center justify-center   font-medium bg-[#F2F2F2] text-[#4D4D4D] ">
          ...
        </div>
      )}
      {prevPage > 1 && <NavItem currentPage={currentPage} pageNum={currentPage - 1} />}
      {currentPage !== 1 && currentPage !== totalPages && <NavItem currentPage={currentPage} pageNum={currentPage} />}
      {nextPage < totalPages && <NavItem currentPage={currentPage} pageNum={currentPage + 1} />}
      {nextPage < totalPages - 1 && (
        <div className=" flex py-2 px-4 items-center justify-center   font-medium bg-[#F2F2F2] text-[#4D4D4D] ">
          ...
        </div>
      )}
      {totalPages !== 1 && <NavItem currentPage={currentPage} pageNum={totalPages} />}

      {currentPage < totalPages && (
        <Link className="text-[#4D4D4D] hover:text-primary" href={`?${createQueryString('page', nextPage.toString())}`}>
          <FaChevronRight />
        </Link>
      )}
    </ul>
  );
}

function NavItem({ currentPage, pageNum }: { currentPage: number; pageNum: number }) {
  const { createQueryString } = useQueryJob();
  if (pageNum < 1) return;
  return (
    <li className="">
      <Link
        scroll={false}
        className={` ${
          currentPage === pageNum ? 'bg-green text-white' : 'bg-[#F2F2F2] text-[#4D4D4D]'
        }  py-2 px-4 hover:opacity-80 font-medium  `}
        href={`?${createQueryString('page', pageNum.toString())}`}
      >
        {pageNum}
      </Link>
    </li>
  );
}
