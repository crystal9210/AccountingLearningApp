import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";

// Geistサンスフォント
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

// Geistモノスペースフォント
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Inter（サンスセリフ）フォント
const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Accounting Learning App",
    description: "A new way to learn accounting.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background antialiased font-sans",
                    fontSans.variable,
                    geistSans.variable,
                    geistMono.variable
                )}
            >
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}
