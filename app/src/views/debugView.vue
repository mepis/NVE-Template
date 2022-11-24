<template>
  <div>
    <h1>Store</h1>
    <p>{{ this.$store.state }}</p>
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
