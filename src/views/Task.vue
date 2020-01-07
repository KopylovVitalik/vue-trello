<template>
  <div class="modal-view">
    <div class="flex flex-col flex-grow mx-4">
      <input
        type="text"
        :value="task.name"
        class="flex-grow p-4 text-xl bg-grey-lighter border-grey border focus:bg-grey-light font-bold"
        @change="updateProp($event, 'name')"
      />
      <textarea
        :value="task.description"
        class="relative h-64 mt-5 p-4 bg-grey-lighter border-grey border focus:bg-grey-light rounded flex-grow"
        @change="updateProp($event, 'description')"
      ></textarea>
      <!-- <label class="md:w-2/3 block text-grey font-bold mt-5">
        <input
          class="mr-2 leading-loose"
          type="checkbox"
          :checked="task.highPriority"
          @change="updateProp($event, 'highPriority')"
        />
        <span class="text-lg font-bold text-black">Top priority</span>
      </label> -->
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
      e.target.value = '';
        // e.target.type === "checkbox"
        //   ? e.target.value === "on"
        //     ? ""
        //     : "on"
        //   : "";
    }
  }
};
</script>

<style>
.modal-view {
  @apply relative flex flex-col bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
