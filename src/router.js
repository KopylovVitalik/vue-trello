import Vue from "vue";
import Router from "vue-router";
import Board from "./views/Board.vue";
import Task from "./views/Task";
import Alert from "./views/Alert.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "board",
      component: Board,
      children: [
        {
          path: "task/:id",
          name: "task",
          component: Task
        },
        {
          path: "alert",
          name: "alert",
          component: Alert
        }
      ]
    }
  ]
});