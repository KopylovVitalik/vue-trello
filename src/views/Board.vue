<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        v-for="(column, columnIndex) of board.columns"
        :key="columnIndex"
        @drop="moveTask($event, column.tasks)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="flex font-bold mb-2 items-center uppercase justify-center">{{ column.name }}</div>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, taskIndex) in column.tasks"
            :key="taskIndex"
            @click="goToTask(task)"
            @dragstart="pickupTask($event, taskIndex, columnIndex)"
            draggable
          >
            <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
            <p
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >{{ task.description }}</p>
          </div>
          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>
    </div>
    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
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
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({
        name: "task",
        params: { id: task.id }
      });
    },
    close() {
      this.$router.push({ name: "board" });
    },
    createTask(evt, tasks) {
      console.log(evt);
      this.$store.commit("CREATE_TASK", { tasks, name: evt.target.value });
      evt.target.value = "";
    },
    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("task-index", taskIndex);
      e.dataTransfer.setData("from-index", fromColumnIndex);
      // this.$store.commit('MOVE_TASK')
    },
    moveTask(e, toTasks) {
      const fromColumnIndex = e.dataTransfer.getData("from-index");
      const fromTasks = this.board.columns[fromColumnIndex].tasks;
      const taskIndex = e.dataTransfer.getData("task-index");

      this.$store.commit("MOVE_TASK", {
        fromTasks,
        toTasks,
        taskIndex
      });
    }
  }
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
