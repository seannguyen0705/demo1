export default function NotePieChartJob() {
  return (
    <div className="grid grid-cols-3 mb-3 gap-2 w-full">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 bg-green`} />
        <span className="text-muted-foreground">Mới</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 bg-yellow`} />
        <span className="text-muted-foreground">Đã xem</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 bg-chart-3`} />
        <span className="text-muted-foreground">Phỏng vấn</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 bg-blue`} />
        <span className="text-muted-foreground">Đã nhận</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 bg-chart-1`} />
        <span className="text-muted-foreground">Từ chối</span>
      </div>
    </div>
  );
}
