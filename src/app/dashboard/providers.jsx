import { ThemeProvider } from 'next-themes'
import ToastProvider from './toastProvider'

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ToastProvider />
      {children}
    </ThemeProvider>
  )
}
