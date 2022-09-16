<template>
  <div>
    <el-container>
      <el-row>
        <el-button type="primary" @click="syncPantry">Save Chnages</el-button>
      </el-row>
      <div v-if="pantryItems.length > 0">
        <div v-for="item in pantryItems" :key="item._id">
          <el-row>
            <el-col :span="8">
              <el-input v-model="item.ingedient" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.data.volume" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.data.volumeType" />
            </el-col>
            <el-col :span="7">
              <el-input v-model="item.data.purchaseHistory.cost" />
            </el-col>
            <el-col :span="1">
              <el-button
                type="primary"
                @click="deletePantryItem(item.ingedient)"
                >Delete</el-button
              >
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-else>
        <el-row>
          This pantry is empty! It's time to go gorcery shopping.
        </el-row>
      </div>
      <div>
        <el-form :model="newPantryItemForm">
          <el-row>
            <el-col :span="8">
              <el-input v-model="newPantryItemForm.ingedient" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="newPantryItemForm.data.volume" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="newPantryItemForm.data.volumeType" />
            </el-col>
            <el-col :span="7">
              <el-input v-model="newPantryItemForm.data.purchaseHistory.cost" />
            </el-col>
            <el-col :span="1">
              <el-button type="primary" @click="updatePantry">Save</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "pantryView",
  components: {},
  data() {
    return {
      pantryItems: [],
      newPantryItemForm: {
        ingedient: "",
        data: {
          volume: "",
          volumeType: "",
          purchaseHistory: {
            cost: 0,
            purchaseDate: "",
          },
        },
      },
    };
  },
  mounted() {
    this.pantryItems = this.$store.getters.getPantry;
  },
  created: {},
  computed: {
    waitingToFinishSync() {
      return this.$store.getters.getPantryWaitingToSync;
    },
  },
  watch: {
    waitingToFinishSync() {
      this.pantryItems = this.$store.getters.getPantry;
    },
  },
  methods: {
    deletePantryItem(id) {
      const ingredient = this.pantryItems.find((item) => item.ingedient === id);
      this.pantryItems.remove(ingredient);
      this.syncPantry();
    },
    updatePantry() {
      this.newPantryItemForm.purchaseHistory.data.purchaseDate = new Date();
      this.pantryItems.push(this.newPantryItemForm);
      this.newPantryItemForm.ingedient = "New Pantry Item";
      this.newPantryItemForm.data.volume = 0;
      this.newPantryItemForm.data.purchaseHistory.cost = 0;
      this.syncPantry();
    },
    syncPantry() {
      const payload = {
        endpoint: "updatePantry",
        action: "update",
        user: this.$auth0.user,
        data: this.pantryItems,
      };
      this.$store.dispatch("performCRUDOperation", payload);
    },
  },
};
</script>
