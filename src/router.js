import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
     {
      path: "/",
      name: "home",
      component: () => import("./components/AllRecords")
    },
    {
      path: "/add-record",
      name: "add-record",
      component: () => import("./components/AddRecord")
    },
    {
      path: "/edit-record",
      name: "edit-record",
      component: () => import("./components/EditRecord")
    },
    
  ]
});