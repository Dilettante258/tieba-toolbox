import type { Metadata } from "next";
import { Inter, Roboto_Mono } from 'next/font/google'
import "./globals.css";
import {Providers} from "./providers";
import NavigationHeader from "@/components/NavigationHeader";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: "贴吧工具箱",
  description: "新一代的贴吧工具箱！",
  referrer: 'no-referrer',
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans" className={`${inter.variable} ${roboto_mono.variable}`}>
    <body suppressHydrationWarning={true}>
    <Providers>
      <div className="flex flex-col h-full">
        <NavigationHeader/>
        <main>
          {children}
        </main>
      </div>
      </Providers>
    </body>
    </html>
  );
}
