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
            <el-menu-item index="3" @click="logout" class="noStyle"
              >Log Out</el-menu-item
            >
            <el-menu-item
              index="4"
              @click="this.$router.push(`/login`)"
              class="noStyle"
              >Log In</el-menu-item
            >
            <el-menu-item
              index="5"
              @click="this.$router.push(`/register`)"
              class="noStyle"
              >Register</el-menu-item
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
  computed: {},
  watch: {},
  methods: {
    logout() {
      console.log("test");
      const payload = {
        token: "",
        _id: "",
        nickname: "",
        name: "",
        picture: "",
        updated_at: "",
        email: "",
        email_verified: "",
        dateAdded: "",
      };
      this.$store.commit("setuser", payload);
      this.$router.push(`/`);
    },
  },
};
</script>

<style scoped>
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
