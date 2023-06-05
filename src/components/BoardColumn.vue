<template>
  <div
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
      <ColumnTask
        v-for="(task, taskIndex) of column.tasks"
        :key="taskIndex"
        :task="task"
        :taskIndex="taskIndex"
        :columnIndex="columnIndex"
        :column="column"
        :board="board"
      />
      <input
        type="text"
        class="block hover:bg-green-100 cursor-pointer p-2 w-full bg-transparent"
        placeholder="+ Enter new Task"
        @keyup.enter="createTask($event, column.tasks)"
      />
    </div>
  </div>
</template>

<script>
import ColumnTask from "@/components/ColumnTask.vue";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";
export default {
  mixins: [movingTasksAndColumnsMixin],
  components: {
    ColumnTask,
  },
  methods: {
    createTask(event, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: event.target.value,
      });
      event.target.value = "";
    },
    pickupColumn(event, fromColumnindex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("type", "column");
      event.dataTransfer.setData("from-column-index", fromColumnindex);
    },
  },
};
</script>

<style lang="css" >
.column {
  min-width: 350px;
}
</style>