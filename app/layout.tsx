import type { Metadata } from "next";
import "./font.css";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://yashd.in"),

  title: "Yash Deshpande, Web Designer and Developer",
  description:
    "Hello there, I'm a web designer and developer crafting polished websites, thoughtful interfaces, and production-ready web products from Mumbai.",

  keywords:
    "web designer, web developer, creative developer, UI developer, frontend developer, Next.js, React, headless Shopify, Mumbai developer, freelance developer, production-ready websites",

  openGraph: {
    siteName: "Yash Deshpande",
    title: "Yash Deshpande, Web Designer and Developer",
    description:
      "Hello there, I'm a web designer and developer crafting polished websites, thoughtful interfaces, and production-ready web products from Mumbai.",
    type: "website",
    url: "https://yashd.in",
    images: [
      {
        url: "https://yashd.in/images/sharing-image-2400x2400.png",
        width: 2400,
        height: 2400,
        alt: "Yash Deshpande Web Designer and Developer",
      },
      {
        url: "https://yashd.in/images/sharing-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Yash Deshpande Web Design and Development Portfolio",
      },
    ],
  },

  twitter: {
    title: "Yash Deshpande Web Designer and Developer",
    description:
      "Hello there, I'm a web designer and developer crafting polished websites and thoughtful interfaces.",
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
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="1cb82add-d8e1-495b-af1d-a2202c221069"
        ></script>
      </head>
      <body className="overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
