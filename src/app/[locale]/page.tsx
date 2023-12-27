import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Index');
  const locale = useLocale();
  return (
    <main className="container flex justify-center items-center min-h-screen gap-5">
      <div className='text-center space-y-4'>
        <h1 className='text-red-500 my-8'>{t('title')}</h1>
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
      </div>
    </main>
  );
}
