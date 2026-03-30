import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import FloatingSpamCheck from "@/components/floating-spam-check"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
          <FloatingSpamCheck />
        </LanguageProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
