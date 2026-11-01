import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "City Guide",
  description: "Discover places around the city.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
