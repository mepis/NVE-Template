<template>
  <div>
    <h1>Hi!</h1>
    <p>I'll add more things here eventually...</p>
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
