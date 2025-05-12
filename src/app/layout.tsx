import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetPal+ | AI Companion for Kids & Their Pets",
  description: "Help kids bond with their pets through interactive AI features—making pet care fun, educational, and emotionally engaging.",
  keywords: ["pets", "children", "AI", "education", "pet care", "AR", "games"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="text-2xl font-bold text-purple-600">
                PetPal+ 🐾
              </a>
              <div className="space-x-4">
                <a href="/login" className="text-gray-600 hover:text-purple-600">
                  Login
                </a>
                <a
                  href="/get-started"
                  className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-50 border-t">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About PetPal+</h3>
                <p className="text-gray-600">
                  Making pet care fun and educational for kids through AI-powered experiences.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Virtual AI Sidekick</li>
                  <li>Pet Translator</li>
                  <li>Story Mode</li>
                  <li>AR Playroom</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="/help" className="hover:text-purple-600">Help Center</a></li>
                  <li><a href="/blog" className="hover:text-purple-600">Blog</a></li>
                  <li><a href="/contact" className="hover:text-purple-600">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="/privacy" className="hover:text-purple-600">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-purple-600">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-gray-600">
              <p>© {new Date().getFullYear()} PetPal+. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
