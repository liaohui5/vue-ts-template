<template>
  <div class="w-screen h-screen overflow-hidden flex items-center justify-center">
    <form class="w-96 border rounded-lg px-8 py-4">
      <p class="text-center text-xl py-4">登录</p>
      <div class="py-4">
        <input
          class="input input-bordered w-full"
          type="text"
          placeholder="邮箱"
          v-model="formData.email"
        />
        <p class="text-red-500 h-1">{{ errMsg.email }}</p>
      </div>

      <div class="py-4">
        <input
          class="input input-bordered w-full"
          type="password"
          placeholder="密码"
          v-model="formData.password"
        />
        <p class="text-red-500 h-1">{{ errMsg.password }}</p>
      </div>

      <div class="py-4">
        <button @click="handleSubmit" class="btn w-full btn-primary text-base-100">登录</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useGoto } from "@/hooks";
import { useAuth } from "@/store";
import { validate, flatErrors, LoginFormRules, type LoginFormType } from "@/validation";

const formData = reactive<LoginFormType>({
  email: "admin@qq.com",
  password: "123456",
});

const errMsg = ref<LoginFormType>({
  email: "",
  password: "",
});

// 登录
const { login } = useAuth();
const { redirectToHome } = useGoto();
async function handleSubmit() {
  const { passed, data, errors } = await validate(formData, LoginFormRules);
  if (!passed) {
    errMsg.value = flatErrors<LoginFormType>(errors);
    return;
  }
  await login(data);
  // await login(formData);
  redirectToHome();
}
</script>
