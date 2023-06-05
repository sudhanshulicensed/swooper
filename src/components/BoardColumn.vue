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
export default {
  components: {
    ColumnTask,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    createTask(event, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: event.target.value,
      });
      event.target.value = "";
    },
    // goToTask(task) {
    //   this.$router.push({ name: "task", params: { id: task.id } });
    // },
    // pickupTask(event, taskIndex, fromColumnindex) {
    //   event.dataTransfer.effectAllowed = "move";
    //   event.dataTransfer.dropEffect = "move";

    //   event.dataTransfer.setData("from-task-index", taskIndex);
    //   event.dataTransfer.setData("type", "task");
    //   event.dataTransfer.setData("from-column-index", fromColumnindex);
    // },
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

<style lang="css" >
.column {
  min-width: 350px;
}
</style>