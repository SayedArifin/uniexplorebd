import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
const josfin = Josefin_Sans({ subsets: ["latin"], weight: "700" });
export const metadata: Metadata = {
  title: 'UniExplore-BD',
  description: 'university shortlisting website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={josfin.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        ><Providers>
            {children}
          </Providers>
          <Toaster />
        </ThemeProvider>

      </body>
    </html>
  )
}
