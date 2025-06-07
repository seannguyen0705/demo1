'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Edit, Trash2, ArrowUpDown, Filter } from 'lucide-react';

// Sample candidate data
const candidatesData = [
  {
    id: 1,
    fullName: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    phone: '0901234567',
    applicationDate: '2024-01-15',
    status: 'Chờ phỏng vấn',
  },
  {
    id: 2,
    fullName: 'Trần Thị Bình',
    email: 'tranthibinh@email.com',
    phone: '0912345678',
    applicationDate: '2024-01-20',
    status: 'Đã phỏng vấn',
  },
  {
    id: 3,
    fullName: 'Lê Hoàng Cường',
    email: 'lehoangcuong@email.com',
    phone: '0923456789',
    applicationDate: '2024-01-18',
    status: 'Trúng tuyển',
  },
  {
    id: 4,
    fullName: 'Phạm Thị Dung',
    email: 'phamthidung@email.com',
    phone: '0934567890',
    applicationDate: '2024-01-22',
    status: 'Từ chối',
  },
  {
    id: 5,
    fullName: 'Hoàng Văn Em',
    email: 'hoangvanem@email.com',
    phone: '0945678901',
    applicationDate: '2024-01-25',
    status: 'Chờ phỏng vấn',
  },
  {
    id: 6,
    fullName: 'Vũ Thị Phương',
    email: 'vuthiphuong@email.com',
    phone: '0956789012',
    applicationDate: '2024-01-12',
    status: 'Đã phỏng vấn',
  },
  {
    id: 7,
    fullName: 'Đặng Minh Quang',
    email: 'dangminhquang@email.com',
    phone: '0967890123',
    applicationDate: '2024-01-28',
    status: 'Chờ phỏng vấn',
  },
  {
    id: 8,
    fullName: 'Bùi Thị Hoa',
    email: 'buithihoa@email.com',
    phone: '0978901234',
    applicationDate: '2024-01-30',
    status: 'Trúng tuyển',
  },
];

const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'Chờ phỏng vấn', label: 'Chờ phỏng vấn' },
  { value: 'Đã phỏng vấn', label: 'Đã phỏng vấn' },
  { value: 'Trúng tuyển', label: 'Trúng tuyển' },
  { value: 'Từ chối', label: 'Từ chối' },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Chờ phỏng vấn':
      return 'secondary';
    case 'Đã phỏng vấn':
      return 'outline';
    case 'Trúng tuyển':
      return 'default';
    case 'Từ chối':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function CandidateTable() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidatesData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.phone.includes(searchTerm),
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((candidate) => candidate.status === statusFilter);
    }

    // Sort by application date
    filtered.sort((a, b) => {
      const dateA = new Date(a.applicationDate);
      const dateB = new Date(b.applicationDate);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });

    return filtered;
  }, [statusFilter, sortOrder, searchTerm]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quản lý ứng viên</CardTitle>
          <CardDescription>Danh sách và quản lý thông tin các ứng viên</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">STT</TableHead>
                  <TableHead>Họ Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>SĐT</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={handleSort}
                      className="h-auto p-0 font-medium hover:bg-transparent"
                    >
                      Ngày ứng tuyển
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Không tìm thấy ứng viên nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedCandidates.map((candidate, index) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">{candidate.fullName}</TableCell>
                      <TableCell>{candidate.email}</TableCell>
                      <TableCell>{candidate.phone}</TableCell>
                      <TableCell>{formatDate(candidate.applicationDate)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(candidate.status)}>{candidate.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => console.log('View candidate:', candidate.id)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Xem chi tiết</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => console.log('Edit candidate:', candidate.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Chỉnh sửa</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => console.log('Delete candidate:', candidate.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Xóa</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <div>
              Hiển thị {filteredAndSortedCandidates.length} trong tổng số {candidatesData.length} ứng viên
            </div>
            <div className="flex gap-4">
              <span>Chờ phỏng vấn: {candidatesData.filter((c) => c.status === 'Chờ phỏng vấn').length}</span>
              <span>Đã phỏng vấn: {candidatesData.filter((c) => c.status === 'Đã phỏng vấn').length}</span>
              <span>Trúng tuyển: {candidatesData.filter((c) => c.status === 'Trúng tuyển').length}</span>
              <span>Từ chối: {candidatesData.filter((c) => c.status === 'Từ chối').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
