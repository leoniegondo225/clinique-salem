import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr">
      <head>
       <meta charSet="UTF-8" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
