<template>
  <div
    class="task-view flex flex-row pin mx-4 m-32 mx-auto py-4 text-left rounded shadow"
  >
    <div class="flex flex-col flex-grow items-start justify-content px-4">
      <input
        type="text"
        :value="task.name"
        class="p-2 mr-2 flex-grow text-xl font-bold w-full"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      />
      <textarea
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
        class="relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
      />
    </div>
    <button @click="$router.push({ name: 'board' })">Close</button>
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
  position: relative;
  max-width: 700px;
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
  z-index: 10;
}
</style>
  