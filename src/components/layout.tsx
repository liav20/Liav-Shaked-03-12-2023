import Navbar from './navbar'
// import Footer from './footer'
import { PropsWithChildren, ReactNode } from "react"
export default function Layout({children}:{ children:ReactNode }) {
    return (
        <div className="h-screen">
            <Navbar />
            <main className="">{children}</main>
            {/* <Footer /> */}
        </div>
    )
}

