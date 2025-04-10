import { NavLink } from "react-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";  
import ThemeToggle from "./ThemeToggle";
import { isAbsolute } from "path";

const TheNavigation: React.FC = () => {
    return (   
        <header className="w-full border-b bg-secondary/30 text-foreground">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <NavLink to="/" className="flex items-center gap-2">
                    <img 
                        src="./src/assets/szv_logo.webp"
                        alt="SZV Logo" 
                        className="h-15 w-15"
                    />
                    <span className="text-xl font-bold uppercase">SZV Aplikácia</span>
                </NavLink>

                <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-4 text-lg font-semibold">
                        <NavigationMenuItem>
                            
                            <NavigationMenuLink asChild>
                                <NavLink
                                    to="/"
                                    className="font-bold"                                    
                                >
                                    Domov
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink
                                    to="/clubs"
                                    className={({ isActive}) =>
                                        cn(
                                            "transition-colors hover:text-primary",
                                            isActive ? "text-primary underline" : "text-muted-foreground"  
                                            )
                                    }   
                                >
                                    Kluby
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink
                                    to="/persons"
                                    className={({ isActive}) =>
                                        cn(
                                            "transition-colors hover:text-primary",
                                            isActive ? "text-primary underline" : "text-muted-foreground"  
                                            )
                                    }                                  
                                    >
                                    Ľudia
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink
                                    to="/competitions"
                                    className={({ isActive}) =>
                                        cn(
                                            "transition-colors hover:text-primary",
                                            isActive ? "text-primary underline" : "text-muted-foreground"  
                                            )
                                    }
                                >
                                    Súťaže
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>



                <div className="flex items-center gap-4">
                    <button className="rounded-md border border-input px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                        Prihlásiť
                    </button>
                    <ThemeToggle />
                </div>
            </div>            
        </header>          
    );
}

export default TheNavigation