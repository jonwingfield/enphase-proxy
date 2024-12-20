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
