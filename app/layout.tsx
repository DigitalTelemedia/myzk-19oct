import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import "svgmap/dist/svgMap.min.css";
import Header2 from "@/components/Header2";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Myzk",
  description: "Generated by Myzk app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  console.log("from main layout", session);
  return (
    <html lang="en" data-theme="light">
  
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-84EDRJ28XX"
        ></script>
        <script>
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments) }
  gtag('js', new Date());

  gtag('config', 'G-84EDRJ28XX');
  `}
        </script>
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          {/* <Header2 /> */}
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}




