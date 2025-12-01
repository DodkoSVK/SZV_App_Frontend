<template>
    <div class="container mx-auto flex items-center justify-between py-4 px-6">
        <RouterLink to="/" class="flex items-center gap-2">
            <img
                src="./src/assets/szv_logo.webp"
                alt="SZV Logo"
                class="h-15 w-15"    
            />
            <span class="text-xl font-bold uppercase">SZV Aplikácia</span>            
        </RouterLink>

        <NavigationMenu>
            <NavigationMenuList class="flex items-center gap-4 font-bold">
                
                <NavigationMenuItem>
                    <NavigationMenuLink>
                        <router-link to="/">
                            Domov
                        </router-link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink>
                        <router-link to="/clubs">
                            Kluby
                        </router-link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink>
                        <router-link to="/competitions">
                            Súťaže
                        </router-link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>

        <div class="flex items-center gap-4">
            <Button class="rounded-md border border-input px-3 py-1.5 text-sm font-medium transition-colors hover:bg-primary hover:text-accent-foreground">
                Prihlásiť
            </Button>
            <TheThemeToggle></TheThemeToggle>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router'
    import { 
        NavigationMenu, 
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList
    } from './ui/navigation-menu';
    import { Button } from './ui/button';
    import TheThemeToggle from './TheThemeToggle.vue';

    
    
</script>

<style scoped>

</style>