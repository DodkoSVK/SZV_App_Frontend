import { NavLink } from "react-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import ThemeToggle from "./ThemeToggle";

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
                    <NavigationMenuList className="flex items-center gap-4 font-bold">
                        <NavigationMenuItem>
                            
                            <NavigationMenuLink asChild>
                                <NavLink to="/">
                                    Domov
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to="/clubs">
                                    Kluby
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to="/persons">                                   
                                    Ľudia
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to="/competitions">
                                    Súťaže
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>



                <div className="flex items-center gap-4">
                    <button className="rounded-md border border-input px-3 py-1.5 text-sm font-medium transition-colors hover:bg-primary hover:text-accent-foreground">
                        Prihlásiť
                    </button>
                    <ThemeToggle />
                </div>
            </div>            
        </header>          
    );
}

export default TheNavigation