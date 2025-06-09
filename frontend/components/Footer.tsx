import Link from 'next/link';

const Footer = () => {
  const quotes = [
    'The only way to do great work is to love what you do. - Steve Jobs',
    'Choose a job you love, and you will never have to work a day in your life. - Confucius',
    'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill',
    'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
    'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. - Steve Jobs',
    "The harder you work for something, the greater you'll feel when you achieve it. - Unknown",
    "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
    'The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt',
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  return (
    <footer className="bg-gray-900 text-white py-12 mt-12 ">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-xl italic text-gray-300 mb-4">&quot;{getRandomQuote()}&quot;</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Về Chúng Tôi</h3>
            <p className="text-gray-400">
              Kết nối những chuyên gia tài năng với sự nghiệp mơ ước của họ. Chúng tôi tin tưởng vào việc tạo ra những
              cơ hội có ý nghĩa cho sự phát triển và thành công.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/job" className="text-gray-400 hover:text-white transition">
                  Tìm Việc Làm
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-gray-400 hover:text-white transition">
                  Công Ty
                </Link>
              </li>

              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Kết Nối Với Chúng Tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Ứng Dụng Tuyển Dụng. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
