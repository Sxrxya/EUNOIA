import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: "Antigravity Workspace - AI Cognitive Load Reducer",
    description: "An intelligence layer that detects cognitive overload and actively reduces mental weight. Think lighter, work smarter.",
    keywords: ["AI", "productivity", "cognitive load", "mental clarity", "task management"],
    authors: [{ name: "Antigravity Team" }],
    openGraph: {
        title: "Antigravity Workspace",
        description: "AI that makes thinking feel lighter",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className={`${inter.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
