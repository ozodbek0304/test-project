import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Link, useLocation } from "@tanstack/react-router"
import { User } from "lucide-react"
import { ThemeColorToggle } from "./color-toggle"

const Header = () => {
    const pathname = useLocation().pathname


    return (
        <header className="px-4 md:px-6 py-4 gap-6 flex items-center justify-end bg-card max-w-full box-border">
            <hgroup className="flex items-center justify-end">
                <ThemeColorToggle />
                <DropdownMenu>
                    <div className="relative h-10">
                        <DropdownMenuTrigger className="!outline-none">
                            <Avatar className="relative overflow-hidden">
                                <AvatarImage
                                    src={undefined}
                                    alt="user img"
                                    className="object-cover"
                                />
                                <AvatarFallback>AO</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            asChild
                        >
                            <Link to="/">
                                <User width={16} /> Profile
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </hgroup>
        </header>
    )
}

export default Header
