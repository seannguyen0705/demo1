import Link from 'next/link';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import genQuerySearch from '@/utils/helpers/genQuerySearch';
interface IProps {
  totalPages: number;
  currentPage: number;
  urlSearchParams: URLSearchParams;
}
export default function Pagination({ totalPages, currentPage, urlSearchParams }: IProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <ul className=" flex items-center gap-x-2 justify-center">
      {currentPage > 1 && (
        <Link
          scroll={false}
          className="text-[#4D4D4D] hover:text-primary"
          href={`?${genQuerySearch('page', prevPage.toString(), urlSearchParams)}`}
        >
          <FaChevronLeft />
        </Link>
      )}
      <NavItem currentPage={currentPage} pageNum={1} urlSearchParams={urlSearchParams} />
      {prevPage > 2 && (
        <div className=" flex py-2 px-4 items-center justify-center   font-medium bg-[#F2F2F2] text-[#4D4D4D] ">
          ...
        </div>
      )}
      {prevPage > 1 && (
        <NavItem currentPage={currentPage} pageNum={currentPage - 1} urlSearchParams={urlSearchParams} />
      )}
      {currentPage !== 1 && currentPage !== totalPages && (
        <NavItem currentPage={currentPage} pageNum={currentPage} urlSearchParams={urlSearchParams} />
      )}
      {nextPage < totalPages && (
        <NavItem currentPage={currentPage} pageNum={currentPage + 1} urlSearchParams={urlSearchParams} />
      )}
      {nextPage < totalPages - 1 && (
        <div className=" flex py-2 px-4 items-center justify-center   font-medium bg-[#F2F2F2] text-[#4D4D4D] ">
          ...
        </div>
      )}
      {totalPages !== 1 && <NavItem currentPage={currentPage} pageNum={totalPages} urlSearchParams={urlSearchParams} />}

      {currentPage < totalPages && (
        <Link
          className="text-[#4D4D4D] hover:text-primary"
          href={`?${genQuerySearch('page', nextPage.toString(), urlSearchParams)}`}
        >
          <FaChevronRight />
        </Link>
      )}
    </ul>
  );
}

function NavItem({
  currentPage,
  pageNum,
  urlSearchParams,
}: {
  currentPage: number;
  pageNum: number;
  urlSearchParams: URLSearchParams;
}) {
  if (pageNum < 1) return;

  return (
    <li className="">
      <Link
        scroll={false}
        className={` ${
          currentPage === pageNum ? 'bg-green text-white' : 'bg-[#F2F2F2] text-[#4D4D4D]'
        }  py-2 px-4 hover:opacity-80 font-medium  `}
        href={`?${genQuerySearch('page', pageNum.toString(), urlSearchParams)}`}
      >
        {pageNum}
      </Link>
    </li>
  );
}
