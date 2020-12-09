<template>
  <a-layout style="height: 100%;">
    <a-layout-sider class="courseslider">
      <pre-collapse></pre-collapse>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <pre-header></pre-header>
      </a-layout-header>
      <a-layout-content style="background: #fff; margin: 10px;">
        <pre-context></pre-context>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  import PreCollapse from "./PreCollapse";
  import PreContext from "./PreContext";
  import PreHeader from "./PreHeader";
  export default {
    components: { PreCollapse, PreContext, PreHeader },
    data() {
      return {
      };
    },
  };
</script>

<style scoped>
  .courseslider {
    height: 100%;
    background: #000000;
    overflow-y: auto;
  }

  .ant-layout-header{
    height: 15%;
    background: #fff;
  }
</style>