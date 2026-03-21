import type { Metadata } from "next";
import "./font.css";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://yashd.in"),

  title: "Yash Deshpande, a Creative Developer",
  description:
    "Hello there, I’m a creative developer who loves crafting amazing UIs — but I can handle the full stack too. Building production-ready web experiences from Mumbai.",

  keywords:
    "creative developer, full-stack developer, web developer, UI developer, Next.js, React, frontend developer, Mumbai developer, freelance developer, student developer, amazing UIs, production-ready",

  openGraph: {
    siteName: "Yash Deshpande",
    title: "Yash Deshpande, a Creative Developer",
    description:
      "Hello there, I’m a creative developer who loves crafting amazing UIs — but I can handle the full stack too. Building production-ready web experiences from Mumbai.",
    type: "website",
    url: "https://yashd.in",
    images: [
      {
        url: "https://yashd.in/images/sharing-image-2400x2400.png",
        width: 2400,
        height: 2400,
        alt: "Yash Deshpande — Creative Developer",
      },
      {
        url: "https://yashd.in/images/sharing-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Yash Deshpande — Full-Stack Creative Developer Portfolio",
      },
    ],
  },

  twitter: {
    title: "Yash Deshpande — Creative Developer",
    description:
      "Hello there, I’m a creative developer who loves crafting amazing UIs — but I can handle the full stack too.",
    card: "summary_large_image",
    images: ["/images/sharing-image-2400x2400.png"],
    creator: "@yashd_in",
  },

  icons: {
    icon: "/images/favicon-32x32.png",
    apple: "/images/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://yashd.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased overflow-x-hidden">
      <head>
        <link
  rel="icon"
  href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤓</text></svg>"
/>
      </head>
      <body className="overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
