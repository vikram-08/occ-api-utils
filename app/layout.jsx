import { Inter } from 'next/font/google';
import Footer from './components/footer';
import SideBar from './components/navbar';
import dynamic from 'next/dynamic'
import 'flowbite';
import './globals.css';


const ThemeWithNoSSR = dynamic(
  () => import('./theme'),
  { ssr: false }
)

const HeaderWithNoSSR = dynamic(
  () => import('./components/header/'),
  { ssr: false }
)



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OCC API Utils',
  description: 'Some useful tools for OCC',
}

export default function RootLayout({ children }) {

  return (

    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <ThemeWithNoSSR />
        <section className="flex flex-col h-screen">
          <HeaderWithNoSSR />
          <section className="flex bg-white text-black dark:bg-slate-900 dark:text-white">
            <SideBar />
            <section className="p-10 w-full">{children}</section>
          </section>
          <Footer />
        </section>
      </body>
    </html>
  )
}
