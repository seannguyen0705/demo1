'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SearchAndFilter from './components/SearchAndFIlter';
import TableCandidate from './components/TableCandidate';

export default function ManageCandidates() {
  // All hooks must be inside the component function

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
