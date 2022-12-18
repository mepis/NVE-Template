<template>
  <div>
    <h1>Hi!</h1>
    <p>Account page.</p>
    <P>Change App Language</P>
    <li v-for="language in languageLibrary" :key="language.id">
      <el-button type="primary" @click="updateLanguage(language.id)"
        >{{ language.language }}
      </el-button>
    </li>
  </div>
</template>

<script>
// need to sync user on login
export default {
  name: "accountView",
  components: {},
  data() {
    return {
      languageLibrary: this.$store.getters.getLanguageLibrary,
    };
  },
  // mounted() {},
  // created: {},
  // computed: {},
  watch: {},
  methods: {
    performCrudOperation(payload) {
      this.$store.dispatch("performCRUDOperation", payload);
    },
    updateLanguage(languageCode) {
      this.$store.dispatch("changeLanguage", languageCode);
    },
  },
};
</script>

<style></style>
