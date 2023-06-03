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
          >
            <span class="w-full full-no-shrink font-bold">
              {{ task.name }}
            </span>
            <p
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["board"]),
};
</script>
  
<style lang="css">
.column {
  min-width: 350px;
}

/* .task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
} */
</style>
  