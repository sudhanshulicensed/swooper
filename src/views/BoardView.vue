<template>
  <div class="p-4 bg-teal-300 h-full overflow-auto">
    <div class="flex flex-row item-start">
      <div
        v-for="(column, index) of board.columns"
        :key="index"
        class="column bg-gray-200 p-2 mr-4 text-left shadow rounded"
      >
        <div class="flex item-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-700 no-underline"
            v-for="task of column.tasks"
            :key="task.id"
            @click="goToTask(task)"
          >
            <span class="w-full flex-no-shrink font-bold">
              {{ task.name }}
            </span>
            <p
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >
              {{ task.description }}
            </p>
          </div>
          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new Task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>
    </div>
    <div v-if="isTaskOpen" class="task-bg">
      <router-view />
    </div>
  </div>
</template>
  
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    },
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
    createTask(event, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: event.target.value,
      });
      event.target.value = "";
    },
  },
};
</script>
  
<style lang="css">
.column {
  min-width: 350px;
}

.task-bg {
  /* background: rgba(0, 0, 0, 0.5); */
  position: absolute;
}
</style>
  