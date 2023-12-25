import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  return (
    <main className="container flex justify-center items-center min-h-screen">
      <h1>{t('title')}</h1>
    </main>
  );
}
