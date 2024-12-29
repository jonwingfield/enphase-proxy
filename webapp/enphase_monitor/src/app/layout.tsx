import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { GlobalStateProvider } from "./components/GlobalStateContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Enphase Monitor",
  description: "Monitor your Enphase solar system",
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="Powerflow" />
                <meta name="theme-color" content="#e4e6ed" media="(prefers-color-scheme: light)" />
                <meta name="theme-color" content="#3e536c" media="(prefers-color-scheme: dark)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#000000" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <GlobalStateProvider>
                    <div className="page">
                        <main>
                            {children}
                        </main>
                    </div>
                </GlobalStateProvider>
                <footer className="footer">
                    <div>
                        <Link href="/production">Production</Link>
                    </div>
                    <div>
                        <Link href="/panels">Panels</Link>
                    </div>
                    <div>
                        <Link href="/settings">Settings</Link>
                    </div>
                </footer>
            </body>
        </html>
    );
}
