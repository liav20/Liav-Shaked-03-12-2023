import Link from "next/link"
import { useRouter } from "next/router"

const routes = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Favorites',
        href: '/favorites'
    }]

export default function Navbar() {
    const router = useRouter()
    return (
        <div className="bg-gray-100 text-xl font-semibold">
            <div className="flex flex-row justify-between p-3">
                <p>Hello Weather Task</p>
                <div className="flex gap-4 border-2 p-2 border-black">
                    {routes.map((route) => (
                        <Link
                            className={``}
                            href={route.href}>{route.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}