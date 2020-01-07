<template>
  <div class="column-wrapper">
    <div
      class="column"
      draggable
      @dragstart.self="pickupColumn($event, columnIndex)"
      @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="flex font-extrabold mb-2 items-center uppercase justify-center">{{ column.name }}</div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, taskIndex) in column.tasks"
          :key="taskIndex"
          :task="task"
          :taskIndex="taskIndex"
          :columnIndex="columnIndex"
          :column="column"
          :board="board"
        />
        <input
          type="text"
          class="block p-2 w-full bg-transparent border border-blue rounded-sm"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ColumnTask from "./ColumnTask";
export default {
  components: {
    ColumnTask
  },
  props: {
    board: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    createTask(evt, tasks) {
      this.$store.commit("CREATE_TASK", { tasks, name: evt.target.value });
      evt.target.value = "";
    },
    moveTaskOrColumn(e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData("type");
      if (type === "task") {
        this.moveTask(
          e,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        );
      } else {
        this.moveColumn(e, toColumnIndex);
      }
    },

    pickupTask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("task-index", taskIndex);
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "task");
    },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "column");
    },
    moveTask(e, toTasks, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      const fromTasks = this.board.columns[fromColumnIndex].tasks;
      const fromTaskIndex = e.dataTransfer.getData("task-index");
      this.$store.commit("MOVE_TASK", {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      });
    },
    moveColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex
      });
    }
  }
};
</script>

<style>
.column-wrapper {
  @apply p-2
}
.column {
  @apply bg-blue-light p-3 text-left shadow-lg rounded flex-grow;
  min-width: 300px;
}
</style>