'use client';

import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import SearchAndFilter from './SearchAndFilter';
import TableEmployer from './TableEmployer';

export default function ManageEmployer() {
  return (
    <main className="sm:px-4 px-2 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Quản lý nhà tuyển dụng</CardTitle>
          <CardDescription>Danh sách và quản lý thông tin các nhà tuyển dụng</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <SearchAndFilter />

          {/* Table */}
          <TableEmployer />
        </CardContent>
      </Card>
    </main>
  );
}
