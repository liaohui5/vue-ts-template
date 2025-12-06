<template>
  <div class="w-screen h-screen overflow-hidden flex items-center justify-center">
    <el-card class="w-96">
      <template #header>
        <div class="text-center">
          <h2 class="text-lg">登录</h2>
        </div>
      </template>

      <el-form>
        <el-form-item v-bind="accountProp">
          <el-input v-model="account" placeholder="请输入邮箱/手机号码" size="large" />
        </el-form-item>

        <el-form-item v-bind="passwordProp">
          <el-input v-model="password" type="password" placeholder="密码" size="large" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="flex justify-center">
          <el-button size="large" @click="resetForm()" type="danger">重 置</el-button>
          <el-button size="large" @click="submitHandler" type="primary">登 录</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { useAuth } from "@/store";
import { loginZod, type LoginFormType } from "@/validation";

const store = useAuth();

const { defineField, handleSubmit, resetForm } = useForm<LoginFormType>({
  validationSchema: loginZod,
  initialValues: {
    //// set some initial values for test
    // account: "root@qq.com",
    // password: "123456",
    account: "",
    password: "",
  },
});

const fieldOpts = (state: any) => ({
  props: {
    validateEvent: false,
    error: state.errors[0],
    required: true,
    // label: "",
  },
});
const [account, accountProp] = defineField("account", fieldOpts);
const [password, passwordProp] = defineField("password", fieldOpts);

// validate first
const submitHandler = handleSubmit(store.login);
</script>
