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
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Powerflow" />
                <link rel="apple-touch-icon" href="/solar-panel.png" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" />
                <link rel="apple-touch-startup-image" href="/splash.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <GlobalStateProvider>
                    <div className="page">
                        <div className="picture">
                            <picture>
                                <source srcSet="/powerflow-light.png" type="image/png" media="(prefers-color-scheme: light)" />
                                <source srcSet="/powerflow-dark.png" type="image/png" media="(prefers-color-scheme: dark)" />
                                <img src="/powerflow-light.png" alt="Powerflow" />
                            </picture>
                            <div className="fade">

                            </div>
                        </div>
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
