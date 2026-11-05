import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: { default: "Moholla | Neighbourhood Service", template: "%s | Moholla" },
  description: "Find, host and join community service drives in your area of Dhaka: clothes distribution, tree planting, cleanups, blood camps and more.",
  icons: {
    icon: [
      { url: "/icon.png?v=3", type: "image/png" },
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/favicon-32x32.png?v=3", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/apple-icon.png?v=3",
  },
};

// Runs before first paint so the saved theme never flashes the wrong colours.
const themeScript = `(function(){try{var t=localStorage.getItem('mohollah-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'mohollahnight':'mohollah'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','mohollah')}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mohollah" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Poppins:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="flex min-h-screen flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: { background: "oklch(var(--b1))", color: "oklch(var(--bc))", border: "1px solid oklch(var(--b3))", fontFamily: "var(--font-body)" },
          }}
        />
      </body>
    </html>
  );
}
