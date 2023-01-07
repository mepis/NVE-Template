<template>
  <div id="navBab">
    <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <a
          @click="this.$router.push(`/`)"
          class="font-semibold text-xl tracking-tight"
        >
          {{ this.$store.state.config.appName }}</a
        >
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            v-if="this.$store.state.user.isLoggedIn"
            @click="logout"
            href="#"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            {{ this.language.logout }}
          </a>
          <a
            v-else
            @click="this.$router.push(`/login`)"
            href="#"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            {{ this.language.login }}
          </a>
          <a
            v-if="!this.$store.state.user.isLoggedIn"
            @click="this.$router.push(`/register`)"
            href="#"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            {{ this.language.register }}
          </a>
          <a
            v-if="this.$store.state.config.debug"
            @click="this.$router.push(`/debug`)"
            href="#"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            {{ this.language.debug }}
          </a>
        </div>
        <div>
          <span class="text-white mr-6">
            {{ this.language.hi }}
            {{ this.$store.state.user.userName }}!
          </span>
          <a
            @click="this.$router.push(`/account`)"
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
            >{{ this.language.account }}</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  data() {
    return {};
  },
  setup() {},
  mounted() {},
  created() {},
  computed: {
    language() {
      return this.$store.state.config.language.navBar;
    },
  },
  watch: {},
  methods: {
    logout() {
      console.log("test");
      const payload = {
        data: {
          user: {
            token: "",
            _id: "",
            nickname: "",
            name: "Random Person",
            picture: "",
            updated_at: "",
            email: "",
            email_verified: "",
            dateAdded: "",
            isLoggedIn: false,
          },
        },
      };
      this.$store.commit("setuser", payload);
      this.$router.push(`/`);
    },
  },
};
</script>

<style scoped></style>
