<template>
  <el-container>
    <el-card shadow="hover" class="card">
      <template #header>
        <div class="card-header">
          <span>Register</span>
          <el-button type="primary" @click="resetRegisterForm">Reset</el-button>
          <el-button type="primary" @click="register">Go</el-button>
        </div>
      </template>
      <el-form-item label="Username">
        <el-input v-model="userName" />
      </el-form-item>
      <el-form-item label="First Name">
        <el-input v-model="firstName" />
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input v-model="lastName" />
      </el-form-item>
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
  name: "registerView",
  components: {},
  data() {
    return {
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
    };
  },
  mounted() {},
  // created: {},
  // computed: {},
  watch: {},
  methods: {
    register() {
      const payload = {
        action: "user",
        endpoint: "createUser",
        data: {
          password: this.password,
          email: this.email,
          userName: this.userName,
          firstName: this.firstName,
          lastName: this.lastName,
        },
      };
      this.performCrudOperation(payload);
    },
    resetRegisterForm() {
      this.password = "";
      this.email = "";
      this.firstName = "";
      this.lastName = "";
      this.userName = "";
    },
    performCrudOperation(payload) {
      if (this.$store.getters.getDebug) {
        console.log("payload: ", payload);
      }
      this.$store.dispatch("performCRUDOperation", payload);
      this.resetRegisterForm();
    },
  },
};
</script>

<style></style>
