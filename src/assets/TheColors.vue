<template>
  <div class="bg-[oklch(var(--background))] text-[oklch(var(--foreground))] p-8 font-sans min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Color Tokens Demo</h1>
    <div class="grid grid-cols-1 gap-2 max-w-md">
      <div
        v-for="token in tokens"
        :key="token.name"
        class="flex justify-between items-center px-4 py-2 rounded text-sm mb-1 border"
        :style="{
          backgroundColor: token.bg,
          color: token.text,
          borderColor: 'var(--border)',
        }"
      >
        {{ token.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Definícia typu pre token
interface ColorToken {
  name: string
  bg: string
  text: string
}

// Vytvorenie reaktívneho poľa s typovaním
const tokens = ref<ColorToken[]>([
  // základné farby
  { name: "--background", bg: "var(--background)", text: "var(--foreground)" },
  { name: "--foreground", bg: "var(--foreground)", text: "var(--background)" },
  { name: "--card", bg: "var(--card)", text: "var(--card-foreground)" },
  { name: "--popover", bg: "var(--popover)", text: "var(--popover-foreground)" },
  { name: "--primary", bg: "var(--primary)", text: "var(--primary-foreground)" },
  { name: "--secondary", bg: "var(--secondary)", text: "var(--secondary-foreground)" },
  { name: "--muted", bg: "var(--muted)", text: "var(--muted-foreground)" },
  { name: "--accent", bg: "var(--accent)", text: "var(--accent-foreground)" },
  { name: "--destructive", bg: "var(--destructive)", text: "white" },
  { name: "--border", bg: "var(--border)", text: "var(--foreground)" },
  { name: "--input", bg: "var(--input)", text: "var(--foreground)" },
  { name: "--ring", bg: "var(--ring)", text: "var(--foreground)" },
  // chart farby
  { name: "--chart-1", bg: "var(--chart-1)", text: "var(--foreground)" },
  { name: "--chart-2", bg: "var(--chart-2)", text: "var(--foreground)" },
  { name: "--chart-3", bg: "var(--chart-3)", text: "var(--foreground)" },
  { name: "--chart-4", bg: "var(--chart-4)", text: "var(--foreground)" },
  { name: "--chart-5", bg: "var(--chart-5)", text: "var(--foreground)" },
  // sidebar
  { name: "--sidebar", bg: "var(--sidebar)", text: "var(--sidebar-foreground)" },
  { name: "--sidebar-primary", bg: "var(--sidebar-primary)", text: "var(--sidebar-primary-foreground)" },
  { name: "--sidebar-accent", bg: "var(--sidebar-accent)", text: "var(--sidebar-accent-foreground)" },
  { name: "--sidebar-border", bg: "var(--sidebar-border)", text: "var(--foreground)" },
  { name: "--sidebar-ring", bg: "var(--sidebar-ring)", text: "var(--foreground)" },
])
</script>