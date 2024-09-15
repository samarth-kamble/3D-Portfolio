import localFont from "next/font/local";
import "./globals.css";

const generalSans = localFont({
  src: "./fonts/GeneralSans-Variable.ttf",
  variable: "--font-general-sans",
  weight: "100 200 3000 400 500 600 700 800 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
