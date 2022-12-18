<template>
  <el-container>
    <el-card shadow="hover" class="card">
      <template #header>
        <div class="card-header">
          <span>{{ this.language.login }}</span>
          <el-button type="primary" @click="resetRegisterForm">{{
            this.language.reset
          }}</el-button>
          <el-button type="primary" @click="login">{{
            this.language.go
          }}</el-button>
        </div>
      </template>
      <el-form-item :label="this.language.email">
        <el-input v-model="email" />
      </el-form-item>
      <el-form-item :label="this.language.password">
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
  computed: {
    language() {
      return this.$store.state.config.language.loginView;
    },
  },
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
    resetLoginForm() {
      this.password = "";
      this.email = "";
    },
    performCrudOperation(payload) {
      if (this.$store.getters.getDebug) {
        console.log("payload: ", payload);
      }
      let shouldRoute = this.$store.dispatch("performCRUDOperation", payload);
      if (shouldRoute) {
        this.$router.push(`/`);
      }
      this.resetLoginForm();
    },
  },
};
</script>

<style></style>
