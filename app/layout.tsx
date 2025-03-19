import { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Salem",
  description: "Gestionnaire de clinique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr">
      <head>
       <meta charSet="UTF-8" />
       <link rel="icon" href="/img/favicon.png" type="image/*" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
