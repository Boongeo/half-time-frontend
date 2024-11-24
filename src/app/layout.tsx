import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Half Time: Ready to level up your skills?",
  description: "Connect with experienced developers for personalized mentoring. " +
      "Get expert guidance, code reviews, and career advice to accelerate your growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans font-light">
      <body>{children}</body>
    </html>
  );
}
