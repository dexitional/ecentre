import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainHead from '@/components/Head'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Provider from '@/components/Provider';

export const metadata = {
  title: 'The Election Centre',
  description: 'Realtime Election Informant',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <MainHead />
      <body className="font-poppins scroll-smooth antialiased flex flex-col">
        <Provider>
            <Header />
            <div className='z-0 flex-1'>
              {children}
            </div>
            <Footer />
        </Provider>
      </body>
    </html>
  )
}
