import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CmsProvider } from "@/lib/CmsProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carview | Premium EV Rentals Vancouver",
  description:
    "Premium electric car rental in Vancouver. Lightning fast pickup, impeccably clean cars, cost-efficient EV rentals. Tesla & Polestar fleet.",
  keywords: ["car rental", "EV rental", "Vancouver", "Tesla", "Polestar", "electric car", "luxury rental"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-montserrat)] bg-white text-foreground">
        <CmsProvider>{children}</CmsProvider>
      </body>
    </html>
  );
}
