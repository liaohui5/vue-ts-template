<template>
  <template v-if="useLayout">
    <Layout>
      <router-view />
    </Layout>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Layout from "@/Layout.vue";

const route = useRoute();
const useLayout = computed(() => Boolean(route.meta.useLayout));
</script>
