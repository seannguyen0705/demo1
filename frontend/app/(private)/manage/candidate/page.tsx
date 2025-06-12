'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import TableCandidate from './components/TableCandidate';
import SearchAndFilter from './components/SearchAndFilter';
export default function ManageCandidate() {
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
          <TableCandidate />
        </CardContent>
      </Card>
    </main>
  );
}
