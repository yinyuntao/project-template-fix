import { Menu } from "ant-design-vue";
import path from "path";

const SubMenu = {
  template: `
        <a-sub-menu :key="resolvePath(item.path)" v-bind="$props" v-on="$listeners">
            <span slot="title" class="menu-title">
                <a-icon :type="item.meta&&item.meta.icon"></a-icon>
                <span v-if="item.meta">{{item.meta.title}}</span>
            </span>
            <template v-for="route in item.children">
                <a-menu-item v-if="hasOneShowingChild(route.children, route)" :key="route.path">
                    <router-link v-if="onlyOneChild(route.children, route).meta" :to=" resolvePath(onlyOneChild(route.children, route).path)">
                        <span>{{onlyOneChild(route.children, route).meta.title}}</span>
                    </router-link>
                </a-menu-item>
                <sub-menu v-else :key="item.path" :item="route" :base-path="route.path"></sub-menu>
            </template>
        </a-sub-menu>
    `,
  name: "SubMenu",
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    item: {
      type: Object,
      require: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  methods: {
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
    onlyOneChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return showingChildren?.[0];
      }
      if (showingChildren.length === 0) {
        return { ...parent };
      }
    },
    // 拼接路由
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    },
  },
};

export default SubMenu;
