import localFont from "next/font/local";
import "./globals.css";

const generalSans = localFont({
  src: "./fonts/GeneralSans-Bold.otf",
  variable: "--font-general-sans",
  weight: "900",
});

export const metadata = {
  title: "Samarth Kamble",
  description: "Samarth Kamble - Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
