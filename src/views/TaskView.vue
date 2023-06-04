<template>
  <div
    class="task-view flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow"
  >
    <div class="flex flex-col flex-grow items-start justify-content px-4">
      {{ task.name }}
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
  