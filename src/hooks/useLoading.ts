import { computed, ref } from "vue";

// TODO: 测试 loading.spec.ts
export function useLoading(initial: boolean = false) {
  const loading = ref<boolean>(initial);
  const isLoading = computed<boolean>(() => loading.value);

  function show() {
    loading.value = true;
  }

  function hide() {
    loading.value = false;
  }

  return {
    isLoading,
    show,
    hide,
  };
}
