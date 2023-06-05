<template>
  <div
    class="w-4/5 lg:w-1/2 task-view flex flex-row pin bg-white mx-4 m-32 mx-auto p-4 text-left rounded"
  >
    <div class="flex flex-col flex-grow items-start justify-content px-4">
      <input
        type="text"
        :value="task.name"
        class="p-2 mr-2 flex-grow border text-xl font-bold w-full"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      />
      <textarea
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
        class="relative w-full bg-transparent px-2 border mt-2 h-64 leading-normal"
      />
    </div>
    <div class="flex items-center">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click.self="$router.push({ name: 'board' })"
      >
        Close
      </button>
    </div>
  </div>
</template>
  
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    },
  },
  methods: {
    updateTaskProperty(event, key) {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        key,
        value: event.target.value,
      });
    },
  },
};
</script>
  
<style scoped>
.task-view {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
  z-index: 10;
}
</style>
  