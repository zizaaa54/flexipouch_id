import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // 🔥 INI PENTING
      className={`${poppins.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}