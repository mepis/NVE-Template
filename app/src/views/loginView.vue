<template>
  <el-container>
    <el-card shadow="hover" class="card">
      <template #header>
        <div class="card-header">
          <span>Login</span>
          <el-button type="primary">Go</el-button>
        </div>
      </template>
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
  name: "loginView",
  components: {},
  data() {
    return {
      placeholder: false,
      password: "",
      email: "",
    };
  },
  mounted() {},
  // created: {},
  // computed: {},
  watch: {},
  methods: {
    performCrudOperation(payload) {
      this.$store.dispatch("performCRUDOperation", payload);
    },
  },
};
</script>

<style></style>
