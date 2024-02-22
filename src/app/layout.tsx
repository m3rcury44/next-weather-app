import "./globals.scss";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import ReactQueryProvider from "@/shared/contexts/react-query-provider";
import ThemeProvider from "@/shared/contexts/theme-provider";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Weather App",
    description: "A weather forecast application created using the openweather API",
    icons: {
        icon: "/images/icon.svg"
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
          <body className={work_sans.className}>
            <ThemeProvider>
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </ThemeProvider>
          </body>
      </html>
  );
}
