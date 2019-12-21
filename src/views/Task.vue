<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow mx-4">
      <input
        type="text"
        :value="task.name"
        class="flex-grow p-4 text-xl bg-green-light font-bold"
        @change="updateProp($event, 'name')"
      />
      <textarea
        :value="task.description"
        class="relative h-64 border-none mt-5 p-4 bg-purple-lighter focus:bg-purple-lightest rounded flex-grow"
        @change="updateProp($event, 'description')"
      ></textarea>
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
    }
  },
  methods: {
    updateProp(e, key) {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        key,
        value: e.target.value
      });
      e.target.value = "";
    }
  }
};
</script>

<style>
.task-view {
  @apply relative flex flex-col bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
