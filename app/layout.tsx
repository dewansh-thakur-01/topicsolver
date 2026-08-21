import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundGraphics } from "@/components/BackgroundGraphics";
import { AuthGate } from "@/components/AuthGate";

export const metadata: Metadata = {
  title: "TOPIC SOLVER — Your personalized path to mastering any topic.",
  description: "AI-powered personalized learning platform for Java, Python, SQL, and DSA. Diagnostic assessments, real-time difficulty adjustment, adaptive practice, and low-bandwidth accessibility for remote learners. Designed by AniNova.",
  keywords: ["TOPIC SOLVER", "Personalized Learning", "Adaptive Learning", "Java", "Python", "SQL", "DSA", "Remote Learning Engagement Engine"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const raw = localStorage.getItem('topic_solver_theme_mode');
                const storedTheme = raw ? JSON.parse(raw) : null;
                const activeTheme = storedTheme?.state?.theme || 'light';
                if (activeTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {
                document.documentElement.classList.remove('dark');
                document.documentElement.setAttribute('data-theme', 'light');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#687385] font-sans selection:bg-[#2B6FF3] selection:text-white antialiased flex flex-col justify-between relative dark:bg-[#090C12] dark:text-[#94A3B8]">
        <BackgroundGraphics />
        <Toaster position="top-right" richColors />
        <AuthGate>
          {children}
        </AuthGate>
      </body>
    </html>
  );
}
