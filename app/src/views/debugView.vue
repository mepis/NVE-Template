<template>
  <div class="grow flex place-content-center">
    <div class="max-w-screen-lg space-y-8">
      <h1
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Store
      </h1>

      <table class="table-auto border-2 place-content-start">
        <thead>
          <tr class="border-2">
            <th>this.$store.state.config</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-2">
            <td>this.$store.state.config.debug</td>
            <td>{{ this.$store.state.config.debug }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.config.appName</td>
            <td>{{ this.$store.state.config.appName }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.config.appLogo</td>
            <td>{{ this.$store.state.config.appLogo }}</td>
          </tr>
        </tbody>
        <thead>
          <tr class="border-2">
            <th>this.$store.state.user</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-2">
            <td>this.$store.state.user.Token</td>
            <td>{{ this.$store.state.user.token }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.ID</td>
            <td>{{ this.$store.state.user._id }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.userName</td>
            <td>{{ this.$store.state.user.userName }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.dateAdded</td>
            <td>{{ this.$store.state.user.dateAdded }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.firstName</td>
            <td>{{ this.$store.state.user.firstName }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.lastName</td>
            <td>{{ this.$store.state.user.lastName }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.picture</td>
            <td>{{ this.$store.state.user.picture }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.email</td>
            <td>{{ this.$store.state.user.email }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.emailVerified</td>
            <td>{{ this.$store.state.user.emailVerified }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.isLoggedIn</td>
            <td>{{ this.$store.state.user.isLoggedIn }}</td>
          </tr>
          <tr class="border-2">
            <td>this.$store.state.user.language</td>
            <td>{{ this.$store.state.user.language }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// need to sync user on login
export default {
  name: "debugView",
  components: {},
  data() {
    return {
      placeholder: false,
    };
  },
  mounted() {},
  // created: {},
  computed: {},
  watch: {},
  methods: {
    performCrudOperation(payload) {
      this.$store.dispatch("performCRUDOperation", payload);
    },
  },
};
</script>

<style></style>
