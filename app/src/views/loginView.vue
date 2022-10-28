<template>
  <div>
    <el-form :model="loginForm" label-width="120px">
      <el-form-item label="Password" prop="pass">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// need to sync user on login
export default {
  name: "homeView",
  components: {},
  data() {
    return {
      placeholder: false,
      loginForm: {
        password: "",
        email: "",
      },
    };
  },
  mounted() {},
  created: {},
  computed: {},
  watch: {},
  methods: {
    performCrudOperation(payload) {
      this.$store.dispatch("performCRUDOperation", payload);
    },
  },
};
</script>
