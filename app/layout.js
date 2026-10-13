import "./globals.css";
import { Poppins } from "next/font/google";
import { Nav, Footer, WhatsAppButton } from "@/components/Chrome";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-poppins" });

export const metadata = {
  title: "Ethixweb India | Websites & Google Ads for Indian Businesses",
  description: "Web development, Google Ads and digital marketing for Indian businesses. Mobile-first, UPI and WhatsApp ready, priced in ₹.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body className={`${poppins.variable} font-sans text-ink antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
