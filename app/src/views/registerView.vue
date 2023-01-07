<template>
  <div class="grow flex place-content-center">
    <div class="w-full max-w-md space-y-8">
      <form class="mt-8 space-y-6 p-2">
        <div class="-space-y-px rounded-md shadow-sm">
          <h2
            class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
          >
            Create a New Account
          </h2>
          <div class="py-1">
            <input
              id="userName"
              v-model="userName"
              name="userName"
              required
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              :placeholder="this.language.userName"
            />
          </div>
          <div class="py-1">
            <input
              id="firstName"
              v-model="firstName"
              name="firstName"
              required
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              :placeholder="this.language.firstName"
            />
          </div>
          <div class="py-1">
            <input
              id="lastName"
              v-model="lastName"
              name="lastName"
              required
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              :placeholder="this.language.lastName"
            />
          </div>
          <div class="py-1">
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              :placeholder="this.language.email"
            />
          </div>
          <div class="py-1">
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              :placeholder="this.language.password"
            />
          </div>
        </div>

        <div class="flex w-full justify-center space-x-4">
          <button
            @click="register"
            class="flex w-1/4 justify-center rounded-md border border-transparent bg-gray-800 p-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            {{ this.language.go }}
          </button>
          <button
            @click="resetRegisterForm"
            class="flex w-1/4 justify-center rounded-md border border-transparent bg-gray-800 p-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            {{ this.language.reset }}
          </button>
        </div>
      </form>
    </div>
  </div>
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
