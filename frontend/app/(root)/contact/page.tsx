import { Clock, MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import ContactItem from '../recruitment/components/ContactItem';
import FormReport from './components/FormReport';
export default function Contact() {
  const contacts = [
    {
      icon: <Phone color="#309689" />,
      title: 'Gọi cho chúng tôi',
      description: '0123456789',
    },
    {
      icon: <Mail color="#309689" />,
      title: 'Gửi  email cho chúng tôi',
      description: 'sean.nguyen.goldenowl@gmail.com',
    },
    {
      icon: <Clock color="#309689" />,
      title: 'Giờ làm việc',
      description: 'Thứ 2 - Thứ 6, 9h - 18h',
    },
    {
      icon: <MapPin color="#309689" />,
      title: 'Địa chỉ',
      description: 'Golden Owl, 123 Đường ABC, Quận 1, TP.HCM',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Liên Hệ</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Contact Information */}
        <div>
          <h3 className="text-2xl font-bold">Thông tin liên hệ</h3>
          <p className="text-muted-foreground mb-[30px]">Nếu gặp bất kì vấn đề nào. Đừng do dự liên hệ với chúng tôi</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-y-[30px] gap-x-[10px] mb-[30px]">
            {contacts.map((contact) => (
              <ContactItem contact={contact} key={contact.title} />
            ))}
          </div>
          <div className="flex justify-center items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0699280628005!2d106.68419507592071!3d10.805956258646578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ed87313f6d%3A0x33c218bfd967538d!2zW0dIIExhbmRdIENodW5nIEPGsCBTdW4gVmlsbGFnZSBOZ3V54buFbiBWxINuIMSQ4bqtdQ!5e0!3m2!1sen!2s!4v1747278933320!5m2!1sen!2s"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full lg:h-[400px] object-cover rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <FormReport />
      </div>
    </div>
  );
}
