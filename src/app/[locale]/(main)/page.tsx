import { Boxes } from '@/components/background-box';
import LogoutButton from '@/components/logout-btn';
import { Button } from '@/components/ui/button';
import { isAuthenticated } from '@/lib/auth';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Index');
  const locale = useLocale();
  const isAuth = isAuthenticated()

  return (
    <div className="min-h-screen">
      <div className="relative h-[70vh] w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-background z-10 [mask-image:linear-gradient(to_top_right,white_40%,transparent_50%)] pointer-events-none" />
        <Boxes row={60} className='-top-[30%]' />
        <p className="font-black font-heading text-4xl sm:text-7xl relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-slate-400 to-slate-800">
          {t('title')}
        </p>
        <p className="font-black text-sm sm:text-base relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-slate-300 to-slate-700 tracking-wider">
          Bring joy and fun to your classroom
        </p>
      </div>


      <div className='text-center space-y-4'>
        <div className='space-x-2'>
          <Link href="signup">
            <Button variant="default" color={'primary'}>Sign up</Button>
          </Link>
          <Link href={locale === "vi" ? "/en" : 'vi'}>
            <Button variant="default" color={'primary'}>
              {locale === "vi" ? "English" : "Vietnamese"}
            </Button>
          </Link>
        </div>
        {
          isAuth && (<div className='space-x-2'>
            <Button variant="flat" color={'primary'}>If you see this. You are authenticated!</Button>
            <LogoutButton />
          </div>)
        }
      </div>
    </div>
  );
}
