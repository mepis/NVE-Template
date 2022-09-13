<template>
  <div>
    <el-container>
      <el-row>
        <div v-for="recipe in recipes" :key="recipe._id"></div>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ recipe.name }}</span>
              <el-button class="button" disabled text>Del</el-button>
            </div>
          </template>
          <el-image
            class="recipePreviewImage"
            style="width: 100px; height: 100px"
            :src="recipe.imgLink"
            :fit="fit"
          />
          <el-row>
            <el-button type="primary">Edit</el-button>
          </el-row>
        </el-card>
      </el-row>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "recipeView",
  components: {},
  data() {
    return {
      recipes: [],
      newRecipe: {
        name: "",
        isActive: false,
        ingredients: {
          ingredient: "",
          volume: 0,
          volumeType: "",
        },
        notes: "",
        owner: "",
        imgLink: "",
        log: {
          entry: {
            date: "",
            quantity: 0,
          },
        },
      },
    };
  },
  mounted() {
    this.recipes = this.$store.getters.getRecipes;
  },
  created: {},
  computed: {
    waitingToFinishSync() {
      return this.$store.getters.getRecipesWaitingToSync;
    },
  },
  watch: {
    waitingToFinishSync() {
      this.recipes = this.$store.getters.getRecipes;
    },
  },
  methods: {
    deletePantryItem(id) {
      const ingredient = this.recipes.find((item) => item.ingedient === id);
      this.recipes.remove(ingredient);
      this.syncPantry();
    },
    updatePantry() {
      this.recipes.push(this.newRecipe);
      this.name = "";
      this.isActive = false;
      this.ingredients = {};
      this.notes = "";
      this.owner = "";
      this.imgLink = "";
      this.log = {
        entry: {
          date: "",
          quantity: 0,
        },
      };
      this.syncPantry();
    },
    syncRecipe() {
      const payload = {
        endpoint: "updateRecipe",
        action: "update",
        user: this.$auth0.user,
        data: this.recipes,
      };
      this.$store.dispatch("performCRUDOperation", payload);
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.recipePreviewImage {
  background-color: black;
}
</style>
