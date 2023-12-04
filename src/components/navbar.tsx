import Link from "next/link"
import { useRouter } from "next/router"

const routes = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Favorites',
        href: '/'
    }]

export default function Navbar() {
    const router = useRouter()
    return (
        <div className="bg-gray-100 text-xl font-semibold">
            <div className="flex flex-row justify-between p-3">
                <p>Hello Weather Task</p>
                <div className="flex gap-4">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/favorites'}>Favorites</Link>
                </div>
            </div>
        </div>
    )
}