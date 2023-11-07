import './globals.scss'
import type { Metadata } from 'next'
import { ReactQueryProvider } from './ReactQueryProvider'
import { AppProvider } from '@/context/app.context'
import Header from '@/components/Header/Header'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer/Footer'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
   title: 'Netflix Việt Nam – Xem chương trình truyền hình trực tuyến, Xem phim trực tuyến',
   description:
      'Xem trực tuyến các bộ phim và chương trình truyền hình của Netflix hoặc phát trực tuyến ngay trên TV thông minh, máy chơi game, máy tính, Mac, di động, máy tính bảng và nhiều thiết bị khác nữa.',
   openGraph: {
      images: '/ogImage.png'
   }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <ReactQueryProvider>
         <AppProvider>
            <html lang='en'>
               <body className={`${inter.className} text-sm font-normal text-white`}>
                  <Header />
                  <main className='bg-[#262626]'>{children}</main>
                  <Footer />
               </body>
            </html>
         </AppProvider>
      </ReactQueryProvider>
   )
}
