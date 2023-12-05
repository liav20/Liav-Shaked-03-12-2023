import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

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
            <div className="flex flex-row items-center justify-between p-3">
                <p>Hello Weather Task</p>
                <div className="flex gap-4 items-center">
                    <Switch
                        id="theme"
                        checked={theme === "dark" ? true : false}
                        onCheckedChange={() => theme === "dark" ? setTheme('light') : setTheme("dark")}
                    />
                    <Label htmlFor="theme">Theme</Label>
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