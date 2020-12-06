<template>
  <a-row class="container">
    <a-row type="flex" justify="center" align="middle" class="profile clearfix">
      <a-upload
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal v-model="previewVisible" :footer="null">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </a-row>
    <a-row class="content">
      <a-row>
        <a-col :span="3">
          <a-menu style="width: 150px" @click="handleClick" v-model="curMenus">
            <a-menu-item key="Resource">课程资源</a-menu-item>
          </a-menu>
        </a-col>
        <a-col :span="21">
          <component :is="curMenus[0]"></component>
        </a-col>
      </a-row>
    </a-row>
  </a-row>
</template>

<script>
// import fileUploader from "@/utils/expressFileUploader";
import Resource from "../resource/Resource";

export default {
  components: { Resource },
  data() {
    return {
      teacherName: "李师",
      uid: "201501245789",
      workNumber: "201501245789",
      curMenus: ["Resource"],
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
      ],
    };
  },
  methods: {
    fileInput(file) {
      console.log(file);
      this.fileList = [file];
      return false;
    },
    uploadFile() {
      // const url = "/s3";
      // const config = {
      //   that: this,
      //   successCallback() {
      //     this.$message.success("上传成功！");
      //   },
      //   failCallback(err) {
      //     console.error(err);
      //     this.$message.error("上传失败！");
      //   },
      // };
      // const params = {
      //   Metadata: { uploader: "Henrenx", star: "10" },
      // };
      // fileUploader(this.fileList, url, "", config, params);
    },
    handleClick() {},
    async handlePreview(file = "") {
      if (!file.url && !file.preview) {
        //   file.preview = await getBase64(file.originFileObj);
      }
      // this.previewImage = file.url || file.preview;
      // this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
  },
  created() {},
};
</script>

<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>

<style scoped>
.container {
  background: #f0f2f5;
  padding: 15px 20px 0;
}

.profile {
  padding: 20px;
}

.profile,
.content {
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}

.account {
  margin-right: 30px;
}

.content {
  margin-top: 15px;
  padding: 10px 20px 0;
}
</style>