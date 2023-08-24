import './css/globals.css'
import { Inter } from 'next/font/google'

import Header from './components/header/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Travel Expense Tracker',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}</body>
    </html>
  )
}
