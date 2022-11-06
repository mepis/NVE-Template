<template>
  <el-container>
    <el-card shadow="hover" class="card">
      <template #header>
        <div class="card-header">
          <span>Register</span>
          <el-button type="primary" @click="register">Go</el-button>
        </div>
      </template>
      <el-form-item label="Nickname">
        <el-input v-model="nickname" />
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
        <el-input v-model="password" autocomplete="off" />
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
      nickname: "",
    };
  },
  mounted() {},
  // created: {},
  // computed: {},
  watch: {},
  methods: {
    register() {
      const payload = {
        action: "create",
        endpoint: "createUser",
        data: {
          password: this.password,
          email: this.email,
          nickname: this.nickname,
          firstName: this.firstName,
          lastName: this.lastName,
        },
      };
      this.performCrudOperation(payload);
    },
    performCrudOperation(payload) {
      if (this.$store.getters.getDebug) {
        console.log("payload: ", payload);
      }
      // this.$store.dispatch("performCRUDOperation", payload);
    },
  },
};
</script>

<style></style>
