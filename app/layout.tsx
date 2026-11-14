import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Rodriguez's Wall",
  description:
    "A 2008-style Facebook Wall — write on Juan's wall and watch posts appear live.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
