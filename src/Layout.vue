<template>
  <div class="w-screen h-screen overflow-x-hidden pt-[50px]">
    <NavBar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/nav-bar/index.vue";
</script>
