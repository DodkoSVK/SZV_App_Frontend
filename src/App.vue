<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div className="App bg-secondary/50 text-foreground min-h-screen p-4 transition-colors">
      <header>

      </header>
    </div>


  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>