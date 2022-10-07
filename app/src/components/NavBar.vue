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
            <el-menu-item
              index="2"
              class="noStyle"
              @click="this.$router.push(`/`)"
              >Dashboard</el-menu-item
            >
            <el-menu-item @click="logout" class="noStyle" v-if="isAuthenticated"
              >Log Out</el-menu-item
            >
            <el-menu-item @click="login" class="noStyle" v-else
              >Log In</el-menu-item
            >
          </el-menu>
        </nav></el-header
      >
    </el-container>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  name: "NavBar",
  components: {},
  data() {
    return {};
  },
  setup() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    return {
      login: () => {
        loginWithRedirect();
      },
      logout: () => {
        logout({ returnTo: window.location.origin });
      },
      isAuthenticated,
    };
  },
  mounted() {},
  created() {},
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style scoped></style>
