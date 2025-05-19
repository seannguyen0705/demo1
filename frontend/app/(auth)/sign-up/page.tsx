import RegisterForm from '../components/RegisterForm';
import AuthThirdParty from '../components/AuthThirdParty';
import Benefits from '../components/Benefits';

export default async function SignUpPage() {
  return (
    <main className=" flex  w-full items-center justify-center mb-[50px]">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Registration Form */}
        <div className="space-y-6 px-4 ">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              Chào mừng bạn đến với Job Portal
            </h1>
            <p className="text-muted-foreground">
              Tạo tài khoản để bắt đầu hành trình tìm việc làm của bạn
            </p>
          </div>
          <RegisterForm />
          <div className="flex items-center gap-x-2 justify-center">
            <div className="w-full h-[1px] bg-muted-foreground" />
            <span className="text-muted-foreground uppercase ">Hoặc</span>
            <div className="w-full h-[1px] bg-muted-foreground" />
          </div>
          <AuthThirdParty />
        </div>

        {/* Right Column - Benefits */}
        <div className="flex flex-col justify-center space-y-6 rounded-lg dark:bg-muted bg-[#f9f9f9] p-4 lg:p-8">
          <h2 className="text-2xl font-bold">Tạo tài khoản</h2>
          <Benefits />
        </div>
      </div>
    </main>
  );
}
