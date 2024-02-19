import Navbar from "@/components/Navbar";
import TanstackProvider from "@/lib/TanstackProvider";
import ThemeProvider, { theme } from "@/lib/ThemeProvider";
import { cn } from "@/lib/utils";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Nourish Navigator",
  description: "Automated meal planner based on provided user inputs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "min-h-[100svh] bg-background font-sans antialiased",
          inter.variable
        )}
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),url(/assets/images/background1.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <AppRouterCacheProvider>
          <TanstackProvider>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <main className="relative flex flex-col">
                  <Navbar />
                  <div className="flex-grow flex-1">{children}</div>
                </main>
              </ThemeProvider>
            </MuiThemeProvider>
          </TanstackProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
