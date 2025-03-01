<template>
  <template v-if="withoutLayout">
    <router-view />
  </template>
  <template v-else>
    <Layout>
      <router-view />
    </Layout>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Layout from "@/Layout.vue";

const route = useRoute();
const withoutLayout = computed(() => route.meta.withoutLayout);
</script>
