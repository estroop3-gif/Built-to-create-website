import "./globals.css";
import { Changa_One, Roboto } from "next/font/google";
import NavBar from "@/components/site/NavBar";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const changaOne = Changa_One({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Born to Create Project — Christian Filmmaking Retreats & Online Course",
  description: "A faith-forward filmmaking academy offering global retreats and online courses. Transform your storytelling through 9-day intensive retreats across 8 destinations including Costa Rica, Greece, Africa, Japan, Panama, United Kingdom, Germany, and Thailand. First retreat includes a $2,800 filmmaking kit. Online course: 1-Year Program $35,000 or $2,995/month, 2-Year Mastery Program Year 1 $35,000 or $2,995/month, Year 2 $32,000 or $2,795/month. Includes one-on-one mentorship sessions. Retreat tuition $5,950, returning students save $500 per retreat.",
  keywords: ["filmmaking", "Christian filmmaking", "retreats", "online course", "storytelling", "faith-based", "video production", "cinematography", "Costa Rica", "Greece", "Africa", "Japan", "Panama", "United Kingdom", "Germany", "Thailand"],
  openGraph: {
    title: "Born to Create Project — Christian Filmmaking Retreats & Online Course",
    description: "Transform your storytelling through faith-forward filmmaking education. Global retreats $5,950, online courses $35,000 or monthly plans available.",
    type: "website",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Born to Create Project - Christian Filmmaking Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Born to Create Project — Christian Filmmaking Retreats & Online Course",
    description: "Transform your storytelling through faith-forward filmmaking education. Global retreats $5,950, online courses $35,000 or monthly plans available.",
    images: ["/images/og-home.jpg"],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${changaOne.variable} ${roboto.variable}`}>
      <body className="min-h-screen antialiased font-body">
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <div className="flex min-h-screen flex-col items-center">
          <NavBar />
          <main className="w-full flex-1 flex flex-col items-center justify-start">
            {children}
          </main>
          <Footer />
          <WelcomeModal />
        </div>
      </body>
    </html>
  );
}