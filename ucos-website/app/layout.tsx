import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const bodyFont = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-body",
  display: "swap"
});

const headingFont = bodyFont;

export const metadata: Metadata = {
  title: "UCOS",
  description:
    "UCOS empowers students and universities to drive global citizenship, sustainable development, and meaningful international cooperation.",
  keywords: [
    "UCOS",
    "global citizenship",
    "student engagement",
    "sustainable development",
    "Belgian NGO"
  ],
  openGraph: {
    title: "UCOS | University Centre for Solidarity",
    description:
      "Join a youth-driven movement for global citizenship, student engagement, and sustainable development.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "UCOS | University Centre for Solidarity",
    description:
      "Join a youth-driven movement for global citizenship, student engagement, and sustainable development."
  },
  icons: {
    icon: "https://www.ucos.be/wp-content/uploads/2017/09/Baobab-e1506696015686-80x80.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} bg-white text-black antialiased selection:bg-brand-200 selection:text-brand-900`}
      >
        {children}
      </body>
    </html>
  );
}
