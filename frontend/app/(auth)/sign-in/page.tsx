import AuthThirdParty from '../components/AuthThirdParty';
import Benefits from '../components/Benefits';
import LoginForm from '../components/LoginForm';

export default function SignInPage() {
  return (
    <main className=" flex  w-full items-center justify-center">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Registration Form */}
        <div className="space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Đăng nhập</h1>
            <p className="text-muted-foreground">Nhập thông tin để đăng nhập</p>
          </div>
          <LoginForm />
          <div className="flex items-center gap-x-2 justify-center">
            <div className="w-full h-[1px] bg-muted-foreground" />
            <span className="text-muted-foreground uppercase ">Hoặc</span>
            <div className="w-full h-[1px] bg-muted-foreground" />
          </div>
          <AuthThirdParty />
        </div>

        {/* Right Column - Benefits */}
        <div className="flex flex-col justify-center space-y-6 rounded-lg dark:bg-muted bg-[#f9f9f9] p-4 lg:p-8">
          <h2 className="text-2xl font-bold">Đăng nhập</h2>
          <Benefits />
        </div>
      </div>
    </main>
  );
}
