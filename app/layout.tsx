import "./globals.css";
import React from "react";
import { ThemeModeScript } from "flowbite-react";

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <link
          href="https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.css"
          rel="stylesheet"
        /> */}
        <ThemeModeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
