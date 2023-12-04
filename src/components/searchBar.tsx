import { Button } from "./button";
import { Input } from "./ui/input";

export default function SearchBar() {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="City" />
            <Button type="submit">Search</Button>
        </div>
    )
}