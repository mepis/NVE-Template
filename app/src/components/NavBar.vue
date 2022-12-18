<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <nav>
          <el-menu
            default-active="1"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
          >
            <el-menu-item index="0"
              >{{ this.language.hi }}
              {{ this.$store.state.user.userName }}!</el-menu-item
            >
            <div class="flex-grow" />
            <el-menu-item index="0">
              <el-image
                style="width: 100px; height: 100px"
                :src="this.$store.state.config.appLogo"
                :fit="fit"
              />
              {{ this.$store.state.config.appName }}</el-menu-item
            >
            <div class="flex-grow" />
            <el-menu-item
              index="2"
              @click="this.$router.push(`/`)"
              class="noStyle"
              >{{ this.language.home }}</el-menu-item
            >
            <el-menu-item
              v-if="this.$store.state.user.isLoggedIn"
              index="3"
              @click="logout"
              class="noStyle"
              >{{ this.language.logout }}</el-menu-item
            >
            <el-menu-item
              v-else
              index="4"
              @click="this.$router.push(`/login`)"
              class="noStyle"
              >{{ this.language.login }}</el-menu-item
            >
            <el-menu-item
              v-if="!this.$store.state.user.isLoggedIn"
              index="5"
              @click="this.$router.push(`/register`)"
              class="noStyle"
              >{{ this.language.register }}</el-menu-item
            >
            <el-menu-item
              v-if="!this.$store.state.config.debug"
              index="6"
              @click="this.$router.push(`/debug`)"
              class="noStyle"
              >{{ this.language.debug }}</el-menu-item
            >
            <el-menu-item
              index="7"
              @click="this.$router.push(`/account`)"
              class="noStyle"
              >{{ this.language.account }}</el-menu-item
            >
          </el-menu>
        </nav></el-header
      >
    </el-container>
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

<style scoped>
.flex-grow {
  flex-grow: 1;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
