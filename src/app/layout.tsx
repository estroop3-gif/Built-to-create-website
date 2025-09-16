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
  title: "The Born to Create Project",
  description: "Costa Rica 9-Day Filmmaking Retreat",
  icons: {
    icon: [
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      },
    ],
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