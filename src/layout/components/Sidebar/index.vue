<!-- 侧标栏布局 -->
<template>
  <div class="sidebar-container">
    <logo></logo>
    <a-menu
      :selected-keys="activeMenu"
      :open-keys.sync="openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      :class="collapsed ? 'ant-menu-inline-collapsed' : ''"
    >
      <template v-for="route in menuData">
        <a-menu-item
          v-if="hasOneShowingChild(route.children, route)"
          :key="
            resolvePath(onlyOneChild(route.children, route).path, route.path)
          "
        >
          <router-link
            v-if="onlyOneChild(route.children, route).meta"
            :to="
              resolvePath(onlyOneChild(route.children, route).path, route.path)
            "
          >
            <a-icon
              :type="
                onlyOneChild(route.children, route).meta &&
                onlyOneChild(route.children, route).meta.icon
              "
            ></a-icon>
            <span>{{ onlyOneChild(route.children, route).meta.title }}</span>
          </router-link>
        </a-menu-item>

        <sub-menu
          v-else
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import SubMenu from "./Menu.js";
import path from "path";

export default {
  name: "Sidebar",
  components: {
    Logo,
    SubMenu,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openKeys: [],
      menuData: [
        {
          path: "/",
          children: [
            {
              path: "dashboard",
              name: "Dashboard",
              meta: { title: "首页", icon: "delete" },
            },
          ],
        },
        {
          path: "/user",
          meta: { title: "用户", icon: "delete" },
          children: [
            {
              path: "setting",
              name: "Setting",
              meta: { title: "用户管理", icon: "delete" },
            },
            {
              path: "reports",
              name: "Reports",
              meta: { title: "报告管理", icon: "delete" },
            },
          ],
        },
        {
          path: "/403",
          name: "Error",
          meta: { title: "403", icon: "delete" },
        },
      ],
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const routeKeys = route.path.split("/");
      if (routeKeys.length === 2) {
        return ["/" + routeKeys.pop()];
      }
      return [routeKeys.pop()];
    },
  },
  watch: {
    activeMenu: {
      handler(newVal) {
        this.getSelectKeys();
      },
      immediate: true,
    },
    collapsed: {
      handler(newVal) {
        if (newVal) {
          this.openKeys = [];
        } else {
          this.getSelectKeys();
        }
      },
      immediate: true,
    },
  },
  methods: {
    getSelectKeys() {
      const path = this.$route.path.split("/");
      const pathArr = path.filter((p) => p).map((m) => "/" + m);
      pathArr.pop();
      this.openKeys = pathArr;
    },
    //是否是单一菜单
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        return true;
      }
      return false;
    },
    //得到当前路由的对象
    onlyOneChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        return !item.hidden;
      });

      if (showingChildren.length === 1) {
        return showingChildren?.[0];
      }

      if (showingChildren.length === 0) {
        return { ...parent, path: "" };
      }
    },
    // 拼接多级菜单路由
    resolvePath(routePath, basePath) {
      return path.resolve(basePath, routePath);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  .inline-collapsed-menu {
    width: 80px;
  }
}
</style>
