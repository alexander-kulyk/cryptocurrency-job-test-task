import { locales, routing } from '@/i18n';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import { AppLayout } from '../layouts';
import { ReduxProvider, ThemeProvider } from '../providers';
import '../styles/globals.css';

interface IRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const INTER = Inter({
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-inter',
  subsets: ['cyrillic-ext', 'latin-ext'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const RootLayout = async ({ children, params }: IRootLayoutProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${INTER.variable} min-h-screen flex flex-col`}>
        <NextIntlClientProvider>
          <ReduxProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <AppLayout>{children}</AppLayout>
            </ThemeProvider>
            {/* dont set z-index 10000000000000! */}
            <Toaster />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
