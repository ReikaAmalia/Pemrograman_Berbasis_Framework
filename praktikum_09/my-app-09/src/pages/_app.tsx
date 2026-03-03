import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppShell from '@/components/Appshell'
import Navbar from '@/components/index'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  )
}
