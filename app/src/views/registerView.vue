<template>
  <el-container>
    <el-card shadow="hover" class="card">
      <template #header>
        <div class="card-header">
          <span>{{ this.language.register }}</span>
          <el-button type="primary" @click="resetRegisterForm">{{
            this.language.reset
          }}</el-button>
          <el-button type="primary" @click="register">{{
            this.language.go
          }}</el-button>
        </div>
      </template>
      <el-form-item :label="this.language.userName">
        <el-input v-model="userName" />
      </el-form-item>
      <el-form-item :label="this.language.firstName">
        <el-input v-model="firstName" />
      </el-form-item>
      <el-form-item :label="this.language.lastName">
        <el-input v-model="lastName" />
      </el-form-item>
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
const userUtils = require("../utils/userUtils");

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
  // mounted() { },
  // created: {},
  computed: {
    language() {
      return this.$store.state.config.language.registerView;
    },
  },
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
    async performCrudOperation(payload) {
      let isValidEmail = await userUtils.isValidEmailAddress(this.email);
      let isValidPassword = await userUtils.isValidPassword(this.password);
      if (this.$store.getters.getDebug) {
        console.log("isValidEmail: ", isValidEmail);
        console.log("isValidPassword: ", isValidPassword);
      }
      if (!isValidEmail) {
        this.sendPushNotification("Error", "Invalid Email Address");
      }
      if (!isValidPassword) {
        this.sendPushNotification("Error", "Invalid Password");
      }
      if (isValidEmail && !isValidPassword) {
        if (this.$store.getters.getDebug) {
          console.log("payload: ", payload);
        }
        this.$store.dispatch("performCRUDOperation", payload);
        this.resetRegisterForm();
      }
    },
    sendPushNotification(status, message) {
      let pushNotificationPayload = {
        endpoint: "",
        status: status,
        message: message,
      };
      this.$store.dispatch("pushNotification", pushNotificationPayload);
    },
  },
};
</script>

<style></style>
