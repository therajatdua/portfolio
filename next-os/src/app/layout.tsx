import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ThemeProvider } from '../components/ThemeProvider'

export const metadata = {
  title: 'Rajat Dua — Digital Operating System',
  description: 'Personal operating system and premium product portfolio of Rajat Dua.'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="pt-24 min-h-[calc(100vh-200px)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}


