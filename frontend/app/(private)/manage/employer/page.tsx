'use client';

import SearchAndFilter from '../../manage-candidates/components/SearchAndFIlter';

import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';

export default function ManageEmployer() {
  return (
    <main className="sm:px-4 px-2 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Quản lý ứng viên</CardTitle>
          <CardDescription>Danh sách và quản lý thông tin các ứng viên</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <SearchAndFilter />

          {/* Table */}
        </CardContent>
      </Card>
    </main>
  );
}
