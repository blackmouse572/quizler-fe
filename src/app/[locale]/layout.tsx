import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/lib/config/siteconfig';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import './global.css';

const montserrat = Montserrat({
  weight: ['400', '600', '700', '800', '900', '500', '300', '200'],
  variable: '--font-sans',
  display: 'swap',
  subsets: ['latin-ext', 'vietnamese']
});
const ibmSans = Plus_Jakarta_Sans({
  weight: ['400', '600', '700', '500', '300',],
  variable: '--font-heading',
  display: 'optional',
  subsets: ['latin-ext', 'vietnamese']
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
  ],
  authors: [
    {
      name: "blackmouse572",
      url: "https://ngocnt.dev",
    },
  ],
  manifest: "./manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@shadcn",
  },
}

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};
export default function LocaleLayout({ children, params: { locale } }: Props) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(
        ["min-h-screen bg-background antialiased",
          montserrat.className,
          ibmSans.className,
        ]
      )}>
        {children}
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}
