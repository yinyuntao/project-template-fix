import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index.vue";
import Setting from "@/views/user/setting/index.vue";
import Reports from "@/views/user/reports/index.vue";
import Dashboard from "@/views/dashboard/index.vue";
import Error from "@/views/error/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: Dashboard,
        name: "Dashboard",
        meta: { title: "首页", icon: "delete" },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    children: [
      {
        path: "setting",
        component: Setting,
        name: "Setting",
        meta: { title: "用户管理", icon: "delete" },
      },
      {
        path: "reports",
        component: Reports,
        name: "Reports",
        meta: { title: "报告管理", icon: "delete" },
      },
    ],
  },
  {
    path: "*",
    component: Error,
    hidden: true,
  },
  {
    path: "/403",
    component: Error,
  },
];
//https://blog.csdn.net/dreamingbaobei3/article/details/116227272 addRoute动态路由
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
