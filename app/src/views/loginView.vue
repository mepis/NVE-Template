<template>
  <el-container>
    <el-card shadow="hover" class="card">
      <template #header>
        <div class="card-header">
          <span>Login</span>
          <el-button type="primary" @click="resetRegisterForm">Reset</el-button>
          <el-button type="primary" @click="login">Go</el-button>
        </div>
      </template>
      <el-form-item label="Email">
        <el-input v-model="email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password" autocomplete="off" />
      </el-form-item>
    </el-card>
  </el-container>
</template>

<script>
// need to sync user on login
export default {
  name: "loginView",
  components: {},
  data() {
    return {
      password: "",
      email: "",
    };
  },
  mounted() {},
  // created: {},
  // computed: {},
  watch: {},
  methods: {
    login() {
      const payload = {
        action: "user",
        endpoint: "login",
        data: {
          password: this.password,
          email: this.email,
        },
      };
      this.performCrudOperation(payload);
    },
    resetRegisterForm() {
      this.password = "";
      this.email = "";
    },
    performCrudOperation(payload) {
      this.$store.dispatch("performCRUDOperation", payload);
    },
  },
};
</script>

<style></style>
