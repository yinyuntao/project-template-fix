<!-- layout布局 -->
<template>
  <div class="layout-container">
    <a-layout>
      <a-layout-sider :class="collapsed ? 'ant-layout-sider-collapsed' : ''">
        <sidebar :collapsed="collapsed"></sidebar>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <div class="nav-header">
            <a-button type="primary" @click="toggleCollapsed">
              <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </a-button>
            <a-button type="primary">
              <a-icon type="menu-unfold" />
            </a-button>
          </div>
        </a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sidebar from "@/layout/components/Sidebar/index.vue";

export default {
  name: "Layout",
  components: { Sidebar },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  /deep/.ant-layout-sider-children {
    height: 100vh;
  }
  .nav-header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  /deep/.ant-layout-header {
    padding: 0 20px;
  }
  /deep/.ant-layout-sider-collapsed {
    width: 80px !important;
    flex: none !important;
    min-width: 80px !important;
    max-width: 80px !important;
  }
}
</style>
