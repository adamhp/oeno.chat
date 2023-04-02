import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'oeno.chat - Your AI-powered sommelier',
  description:
    'oeno.chat is an AI-powered sommelier that helps you find the perfect wine to pair with your food.',
  openGraph: {
    title: 'oeno.chat - Your AI-powered sommelier',
    description:
      'oeno.chat is an AI-powered sommelier that helps you find the perfect wine to pair with your food.',
    url: 'https://oeno.chat',
    siteName: 'oeno.chat',
    images: [
      {
        url: 'https://oeno.chat/social.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  applicationName: 'oeno.chat',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'Wine',
    'ChatGPT',
    'OpenAI',
    'GPT-3',
    'Sommelier',
    'AI',
    'Artificial Intelligence',
    'Machine Learning',
    'Wine Pairing',
    'Wine Recommendations',
    'Food & Wine',
  ],
  authors: [
    { name: 'Adam Pearce', url: 'https://adamhp.io' },
    { name: 'Mike Danello' },
  ],
  colorScheme: 'dark',
  creator: 'Adam Pearce & Mike Danello',
  publisher: 'Adam Pearce & Mike Danello',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
