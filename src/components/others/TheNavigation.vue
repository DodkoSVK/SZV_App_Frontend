<template>
    <div className="w-full border-b bg-secondary/30 text-foreground">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <RouterLink to="/" className="flex items-center gap-2">
                <img 
                    src="@/assets/szv_logo.webp"
                    alt="SZV Logo"
                    className="h-15 w-15"
                />
                <span className="text-xl font-bold uppercase">SZV Aplikácia</span>
            </RouterLink>

            <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-4 font-bold">
                        <NavigationMenuItem>
                            
                            <NavigationMenuLink asChild>
                                <RouterLink to="/">
                                    Domov
                                </RouterLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <RouterLink to="/clubs">
                                    Kluby
                                </RouterLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <RouterLink to="/persons">                                   
                                    Ľudia
                                </RouterLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <RouterLink to="/competitions">
                                    Súťaže
                                </RouterLink>
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
    </div>
</template>

<script lang="ts">
    import { RouterLink, RouterView } from 'vue-router'
</script>

