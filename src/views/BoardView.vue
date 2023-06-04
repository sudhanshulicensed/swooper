<template>
  <div class="p-4 bg-teal-300 h-full overflow-auto">
    <div class="flex flex-row item-start">
      <div
        v-for="(column, columnIndex) of board.columns"
        :key="columnIndex"
        draggable
        @dragstart.self="pickupColumn($event, columnIndex)"
        @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        class="column bg-gray-200 p-2 mr-4 text-left shadow rounded"
      >
        <div class="flex item-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-700 no-underline"
            v-for="(task, taskIndex) of column.tasks"
            :key="taskIndex"
            draggable
            @dragstart="pickupTask($event, taskIndex, columnIndex)"
            @click="goToTask(task)"
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="
              moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)
            "
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
      <div class="column flex h-20">
        <input
          @keyup.enter="createColumn"
          type="text"
          class="p-2 m-2 flex-grow"
          placeholder="New Column Name"
          v-model="newColumnName"
        />
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
    createColumn() {
      this.$store.commit("CREATE_COLUMN", {
        name: this.newColumnName,
      });
    },
    pickupTask(event, taskIndex, fromColumnindex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("from-task-index", taskIndex);
      event.dataTransfer.setData("type", "task");
      event.dataTransfer.setData("from-column-index", fromColumnindex);
    },
    pickupColumn(event, fromColumnindex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("type", "column");
      event.dataTransfer.setData("from-column-index", fromColumnindex);
    },
    moveTaskOrColumn(event, toTasks, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData("type");
      if (type === "task") {
        this.moveTask(
          event,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        );
      } else {
        this.moveColumn(event, toColumnIndex);
      }
    },
    moveTask(event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");
      const fromTasks = this.board.columns[fromColumnIndex].tasks;
      const fromTaskIndex = event.dataTransfer.getData("from-task-index");
      this.$store.commit("MOVE_TASK", {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex,
      });
    },
    moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");
      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex,
      });
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
  