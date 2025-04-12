import type {Metadata} from "next";
import "./globals.css";
import NavBar from "@custom/NavBar";
// import { Ubuntu, Ubuntu_Mono } from 'next/font/google'
import AppProviders from "./_providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   // weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   // weight: "100 900",
// });
// const ubuntu = Ubuntu({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '700'],
//   variable: '--font-ubuntu',
// })
//
// const ubuntuMono = Ubuntu_Mono({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   variable: '--font-ubuntu-mono',
// })


export const metadata: Metadata = {
  title: "ToEazy贴吧工具箱",
  description: "让查询贴吧数据变得简单",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang='zh-CN'>
    <body
      className={` antialiased`}
      //${ubuntu.className} ${ubuntuMono.className}
    >
    <AppProviders>
      <NavBar />
      {children}
    </AppProviders>
    </body>
    </html>

  );
}
