import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
@Injectable()
export class EmailService {
  private readonly from: string;
  constructor(private readonly configService: ConfigService) {
    this.from = this.configService.get('SENDGRID_FROM_NOREPLY_EMAIL');
    sgMail.setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  async activeEmployer(email: string, name: string, password: string) {
    await sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Kích hoạt tài khoản doanh nghiệp',
      html: `<html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Kích hoạt tài khoản nhà tuyển dụng</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Chào mừng đến với Job Portal</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${name}</strong>,</p>
        <p>Cảm ơn bạn đã sử dụng <strong>Job Portal</strong>.</p>
        <p>Tài khoản doanh nghiệp của bạn đã được kích hoạt thành công.</p>

        <p style='margin-top: 32px; text-align: center;'>
          <span
            style='display: inline-block; font-size: 18px; font-weight: bold; background-color: #f0f0f0; padding: 12px 24px; border-radius: 6px;'
          >
            Mật khẩu của bạn là:
            ${password}
          </span>
        </p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>`,
    });
  }

  async resetPassword(email: string, name: string, link_reset: string) {
    sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Đặt lại mật khẩu',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Đặt lại mật khẩu</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Đặt lại mật khẩu</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${name}</strong>,</p>
        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
        <p>Vui lòng nhấp vào nút bên dưới để đặt lại mật khẩu của bạn:</p>

        <p style='margin-top: 32px; text-align: center;'>
          <a
            href='${link_reset}'
            style='display: inline-block; background-color: #309689; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;'
          >
            Đặt lại mật khẩu
          </a>
        </p>

        <p style='margin-top: 24px; font-size: 14px; color: #666;'>
          Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
        </p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>`,
    });
  }

  async activeCandidate(email: string, name: string, link_active: string) {
    await sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Kích hoạt tài khoản ứng viên',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Kích hoạt tài khoản</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Kích hoạt tài khoản</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${name}</strong>,</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản với chúng tôi.</p>
        <p>Để hoàn tất quá trình đăng ký, vui lòng nhấp vào nút bên dưới để kích hoạt tài khoản của bạn:</p>

        <p style='margin-top: 32px; text-align: center;'>
          <a
            href='${link_active}'
            style='display: inline-block; background-color: #309689; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;'
          >
            Kích hoạt tài khoản
          </a>
        </p>

        <p style='margin-top: 24px; font-size: 14px; color: #666;'>
          Nếu bạn không thực hiện đăng ký tài khoản này, vui lòng bỏ qua email này.
        </p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>`,
    });
  }

  async deleteJob(email: string, employerName: string, jobName: string, reason: string) {
    sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Thông báo xóa bài tuyển dụng',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Thông báo xóa bài tuyển dụng</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Thông báo xóa bài tuyển dụng</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${employerName}</strong>,</p>
        <p>Chúng tôi xin thông báo rằng bài tuyển dụng
          <strong>"${jobName}"</strong>
          của bạn đã bị xóa bởi quản trị viên.</p>

        ${
          reason
            ? `
          <div style='margin: 24px 0; padding: 16px; background-color: #f8f8f8; border-left: 4px solid #309689;'>
            <p style='margin: 0;'><strong>Lý do xóa:</strong></p>
            <p style='margin: 8px 0 0 0;'>${reason}</p>
          </div>
        `
            : ''
        }

        <p>Nếu bạn có bất kỳ thắc mắc nào về quyết định này, vui lòng liên hệ với chúng tôi để được hỗ trợ.</p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>
      `,
    });
  }

  async deleteEmployer(email: string, fullName: string, reason: string) {
    sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Thông báo xóa tài khoản doanh nghiệp',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Thông báo xóa tài khoản nhà tuyển dụng</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Thông báo xóa tài khoản</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Chúng tôi xin thông báo rằng tài khoản nhà tuyển dụng của bạn đã bị xóa vĩnh viễn bởi quản trị viên.</p>

        ${
          reason
            ? `
          <div style='margin: 24px 0; padding: 16px; background-color: #f8f8f8; border-left: 4px solid #309689;'>
            <p style='margin: 0;'><strong>Lý do xóa:</strong></p>
            <p style='margin: 8px 0 0 0;'>${reason}</p>
          </div>
        `
            : ''
        }

        <p>Lưu ý: Tài khoản của bạn đã bị xóa vĩnh viễn và không thể khôi phục.</p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>
      `,
    });
  }

  async banEmployer(email: string, fullName: string, reason: string) {
    sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Thông báo khóa tài khoản doanh nghiệp',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Thông báo khóa tài khoản nhà tuyển dụng</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Thông báo khóa tài khoản</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Chúng tôi xin thông báo rằng tài khoản nhà tuyển dụng của bạn đã bị khóa tạm thời bởi quản trị viên.</p>

        ${
          reason
            ? `
          <div style='margin: 24px 0; padding: 16px; background-color: #f8f8f8; border-left: 4px solid #309689;'>
            <p style='margin: 0;'><strong>Lý do khóa:</strong></p>
            <p style='margin: 8px 0 0 0;'>${reason}</p>
          </div>
        `
            : ''
        }

        <p>Trong thời gian tài khoản bị khóa, bạn sẽ không thể đăng nhập hoặc sử dụng các tính năng của hệ thống.</p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>`,
    });
  }

  async unbanEmployer(email: string, fullName: string, reason: string) {
    sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Thông báo mở khóa tài khoản doanh nghiệp',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Thông báo khóa tài khoản nhà tuyển dụng</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Thông báo khóa tài khoản</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Chúng tôi xin thông báo rằng tài khoản nhà tuyển dụng của bạn đã bị khóa tạm thời bởi quản trị viên.</p>

        ${
          reason
            ? `
          <div style='margin: 24px 0; padding: 16px; background-color: #f8f8f8; border-left: 4px solid #309689;'>
            <p style='margin: 0;'><strong>Lý do khóa:</strong></p>
            <p style='margin: 8px 0 0 0;'>${reason}</p>
          </div>
        `
            : ''
        }

        <p>Trong thời gian tài khoản bị khóa, bạn sẽ không thể đăng nhập hoặc sử dụng các tính năng của hệ thống.</p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>
      `,
    });
  }

  async adminActiveCandidate(email: string, fullName: string) {
    sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Kích hoạt tài khoản ứng viên',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Kích hoạt tài khoản ứng viên</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Chào mừng đến với Job Portal</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Cảm ơn bạn đã sử dụng <strong>Job Portal</strong>.</p>
        <p>Tài khoản ứng viên của bạn đã được kích hoạt thành công.</p>

      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>`,
    });
  }

  async banCandidate(email: string, fullName: string, reason: string) {
    sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Thông báo khóa tài khoản ứng viên',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Thông báo khóa tài khoản ứng viên</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Thông báo khóa tài khoản</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Chúng tôi xin thông báo rằng tài khoản ứng viên của bạn đã bị khóa tạm thời bởi quản trị viên.</p>

        ${
          reason
            ? `
          <div style='margin: 24px 0; padding: 16px; background-color: #f8f8f8; border-left: 4px solid #309689;'>
            <p style='margin: 0;'><strong>Lý do khóa:</strong></p>
            <p style='margin: 8px 0 0 0;'>${reason}</p>
          </div>
        `
            : ''
        }

        <p>Trong thời gian tài khoản bị khóa, bạn sẽ không thể đăng nhập hoặc sử dụng các tính năng của hệ thống.</p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>`,
    });
  }

  async unbanCandidate(email: string, fullName: string, reason: string) {
    sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Thông báo mở khóa tài khoản ứng viên',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Thông báo mở khóa tài khoản ứng viên</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Thông báo mở khóa tài khoản</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Chúng tôi xin thông báo rằng tài khoản ứng viên của bạn đã được mở khóa.</p>

        ${
          reason
            ? `
          <div style='margin: 24px 0; padding: 16px; background-color: #f8f8f8; border-left: 4px solid #309689;'>
            <p style='margin: 0;'><strong>Lý do mở khóa:</strong></p>
            <p style='margin: 8px 0 0 0;'>${reason}</p>
          </div>
        `
            : ''
        }

        <p>Bạn có thể đăng nhập và sử dụng các tính năng của hệ thống.</p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>`,
    });
  }

  async deleteCandidate(email: string, fullName: string, reason: string) {
    sgMail.send({
      from: this.from,
      to: email,
      subject: 'Job Portal - Thông báo xóa tài khoản ứng viên',
      html: `
      <html lang='vi'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Thông báo xóa tài khoản ứng viên</title>
  </head>
  <body
    style='margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #222;'
  >
    <div style='max-width: 600px; margin: 0 auto;'>

      <!-- Header -->
      <div style='background-color: #309689; padding: 24px; text-align: center; color: #fff;'>
        <h1 style='margin: 0; font-size: 24px;'>Thông báo xóa tài khoản</h1>
      </div>

      <!-- Main content -->
      <div style='padding: 24px; background-color: #fff;'>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Chúng tôi xin thông báo rằng tài khoản ứng viên của bạn đã bị xóa vĩnh viễn bởi quản trị viên.</p>

        ${
          reason
            ? `
          <div style='margin: 24px 0; padding: 16px; background-color: #f8f8f8; border-left: 4px solid #309689;'>
            <p style='margin: 0;'><strong>Lý do xóa:</strong></p>
            <p style='margin: 8px 0 0 0;'>${reason}</p>
          </div>
        `
            : ''
        }

        <p>Lưu ý: Tài khoản của bạn đã bị xóa vĩnh viễn và không thể khôi phục.</p>
      </div>

      <!-- Footer -->
      <div style='background-color: #f6f6f6; padding: 24px; font-size: 14px;'>
        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ tôi qua email:
          <a href='mailto:sean.nguyen.goldenowl@gmail.com' style='color: #309689;'>sean.nguyen.goldenowl@gmail.com</a>
        </p>
      </div>

    </div>
  </body>
</html>`,
    });
  }
}
