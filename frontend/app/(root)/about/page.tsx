import StaticsticsCount from '../../components/StaticsticsCount';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Về Golden Owl Solutions</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Chúng tôi là công ty công nghệ hàng đầu, chuyên kết nối những chuyên gia tài năng với những cơ hội tuyệt vời.
        </p>
      </section>

      {/* Statistics Section */}
      <section className="max-w-xl mx-auto  ">
        <StaticsticsCount />
      </section>

      {/* Mission & Vision Section */}
      <section className="mb-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Sứ Mệnh</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Trao quyền cho cá nhân và tổ chức thông qua các giải pháp công nghệ sáng tạo và những kết nối có ý nghĩa.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Tầm Nhìn</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Trở thành đơn vị dẫn đầu toàn cầu trong việc kết nối nhân tài với cơ hội, thay đổi cách mọi người làm việc
            và phát triển.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Giá Trị Cốt Lõi</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Đổi Mới</h3>
            <p className="text-gray-600 dark:text-gray-400">Không ngừng vượt qua ranh giới và áp dụng công nghệ mới</p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Chính Trực</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Duy trì tiêu chuẩn cao nhất về sự trung thực và minh bạch
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Xuất Sắc</h3>
            <p className="text-gray-600 dark:text-gray-400">Mang đến kết quả vượt trội trong mọi việc chúng tôi làm</p>
          </div>
        </div>
      </section>
    </div>
  );
}
