<template>
  <div class="container">
    <a-card :title="'提问'" class="card">
      <a-row :gutter="20">
        <a-col :span="24">
          <a-row class="title">
            <h3>题目</h3>
          </a-row>
          <a-row style="height: 350px">
            <div id="editor"></div>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  data() {
    return {
    };
  },
  methods: {
    handleChange(value) {
      console.log(`Selected: ${value}`);
    },
    createEditor(selector) {
      const editor = new E(selector);
      editor.config.showFullScreen = false;
      editor.config.menus = [
        "head",
        "bold",
        "fontSize",
        "italic",
        "underline",
        "strikeThrough",
        "lineHeight",
        "foreColor",
        "backColor",
        "link",
        "list",
        "justify",
        "image",
        "video",
        "code",
      ];
      editor.create();
    },
  },
  mounted() {
    this.createEditor("#editor");
  },
};
</script>

<style scoped>
.card-btn .ant-btn {
  margin: 0 5px;
}

.title h3 {
  padding: 10px 0;
}

.options {
  padding-left: 30px;
  position: relative;
  right: 10px;
  margin-bottom: 20px;
}

.card {
  margin-bottom: 40px;
}
</style>