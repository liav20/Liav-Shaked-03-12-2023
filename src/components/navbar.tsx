import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/redux/store/store";
import { setIsTemperatureCelsius } from "~/redux/slices/weatherSlice";

const routes = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Favorites',
        href: '/favorites',
    }]

export default function Navbar() {
    const { systemTheme, theme, setTheme } = useTheme();
    const dispatch = useDispatch()
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isTemperatureCelsius = useSelector((state: RootState) => state.weather.isTemperatureCelsius)
    const router = useRouter()
    return (
        <div className="flex flex-row items-center justify-between p-3 text-xl 
        font-semibold bg-indigo-100 dark:bg-black flex-wrap">
            <p>Hello Weather Task</p>
            <div className="flex gap-4 items-center">
                <Switch
                    id="theme"
                    checked={isTemperatureCelsius}
                    onCheckedChange={() => dispatch(setIsTemperatureCelsius())}
                />
                <Label>{isTemperatureCelsius ? 'Celsius' : 'Fahrenheit'}</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        className={`${router.pathname === route.href && 'border-b-2 border-indigo-500 dark:border-indigo-500'}`}
                        href={route.href}>{route.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}