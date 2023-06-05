<template>
  <div class="p-4 bg-teal-300 h-full overflow-auto">
    <div class="flex flex-col gap-2 item-start lg:flex-row">
      <BoardColumn
        v-for="(column, columnIndex) of board.columns"
        :key="columnIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"
      />
      <div class="column mr-4 flex h-20">
        <input
          @keyup.enter="createColumn"
          type="text"
          class="p-2 cursor-pointer bg-green-100 hover:bg-green-200 flex-grow"
          placeholder="New Column Name"
          v-model="newColumnName"
        />
      </div>
    </div>
    <div v-if="isTaskOpen">
      <router-view />
    </div>
  </div>
</template>
  
<script>
import { mapState } from "vuex";
import BoardColumn from "@/components/BoardColumn";
export default {
  components: {
    BoardColumn,
  },
  data() {
    return {
      newColumnName: "",
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    },
  },
  methods: {
    createColumn() {
      this.$store.commit("CREATE_COLUMN", {
        name: this.newColumnName,
      });
    },
  },
};
</script>
  
<style lang="css">
.column {
  min-width: 350px;
}
</style>
  