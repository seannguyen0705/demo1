import { getTranslations } from 'next-intl/server';
import { RegisterForm } from '../components/RegisterForm';
import BenefitItem from '../components/BenefitItem';
import AuthThirdParty from '../components/AuthThirdParty';

export default async function SignUpPage() {
  const t = await getTranslations('register-page');

  return (
    <main className=" flex md:h-screen w-full items-center justify-center">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Column - Registration Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{t('createAccount')}</h1>
            <p className="text-muted-foreground">{t('enterInformation')}</p>
          </div>
          <RegisterForm />
          <AuthThirdParty />
        </div>

        {/* Right Column - Benefits */}
        <div className="flex flex-col justify-center space-y-6 rounded-lg dark:bg-muted bg-[#f9f9f9] p-8">
          <h2 className="text-2xl font-bold">{t('title')}</h2>
          <BenefitItem
            title={t('benefits.benefit1.title')}
            description={t('benefits.benefit1.description')}
          />
          <BenefitItem
            title={t('benefits.benefit2.title')}
            description={t('benefits.benefit2.description')}
          />
          <BenefitItem
            title={t('benefits.benefit3.title')}
            description={t('benefits.benefit3.description')}
          />
        </div>
      </div>
    </main>
  );
}
