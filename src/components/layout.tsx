import Navbar from './navbar'
// import Footer from './footer'
import { PropsWithChildren, ReactNode } from "react"
import { Toaster } from './ui/toaster'
export default function Layout({children}:{ children:ReactNode }) {
    return (
        <div className="h-screen">
            <div className='sticky top-0 bg-gray-100 dark:bg-gray-900 z-50'>
            <Navbar />
            </div>
            <main className="">{children}</main>
            {/* <Footer /> */}
            <Toaster />
        </div>
    )
}

