import { useTheme } from "next-themes";
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "./button";

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
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const router = useRouter()
    return (
        <div className="text-xl font-semibold">
            <div className="flex flex-row justify-between p-3">
                <p>Hello Weather Task</p>
                <div className="flex gap-4  ">
                    <Button
                        onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
                    >Click me
                    </Button>
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            className={``}
                            href={route.href}>{route.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}