import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import NavigationHeader from "@/components/NavigationHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "贴吧工具箱",
  description: "新一代的贴吧工具箱！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans">
    <body className={inter.className} suppressHydrationWarning={true}>
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
