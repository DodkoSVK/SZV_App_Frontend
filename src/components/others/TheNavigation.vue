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
        </div>
    </div>
</template>

<script lang="ts">
    import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>

</style>