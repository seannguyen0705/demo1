'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import useUploadFile from '@/app/hooks/useUploadFile';
import useDeleteFile from '@/app/hooks/useDeleteFile';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import ContactItem from '../recruitment/components/ContactItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  subject: z.string().min(5, 'Tiêu đề phải có ít nhất 5 ký tự'),
  content: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
  fileId: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fileId, mutate: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteFile();

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

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      content: '',
      fileId: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call here
      console.log('Form data:', data);
      toast.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    form.setValue('fileId', fileId);
  }, [fileId, form]);

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
        <Card className="">
          <CardHeader>
            <CardTitle>Gửi Tin Nhắn</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập họ và tên của bạn" {...field} className="selection:bg-green" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập email của bạn"
                          type="email"
                          {...field}
                          className="selection:bg-green"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tiêu đề tin nhắn" {...field} className="selection:bg-green" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập nội dung tin nhắn của bạn"
                          className="min-h-[120px] selection:bg-green"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fileId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File đính kèm (tùy chọn)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) {
                              return;
                            }
                            if (fileId) {
                              deleteFile(fileId);
                            }
                            uploadFile({ file, folder: 'contact' });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang gửi...' : 'Gửi liên hệ'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
