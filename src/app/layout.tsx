/** @format */

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import StoreIntializer from "@/helpers/StoreIntializer";

export const metadata: Metadata = {
  title: "The FeedBack App",
  description: "One place for all your user feedbacks and reviews. Easily place feedback popup and widget on your website or app and track & analyze them easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head />
      <body className="font-default">
        <StoreIntializer />
        <div>{children}</div>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
