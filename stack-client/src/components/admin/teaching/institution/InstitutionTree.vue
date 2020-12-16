<template>
  <div>
    <a-tree
      :load-data="onLoadData"
      :tree-data="treeData"
      :show-line="true"
      @select="onSelect"
      :defaultExpandedKeys="['1']"
    />
    <div class="btn-area">
      <a-button-group>
        <a-button @click="addCollegeVisible = true" type="primary">
          + 学院
        </a-button>
        <a-button @click="addMajorVisible = true" type="primary">
          + 专业
        </a-button>
        <!-- <a-button @click="edit" type="primary">编辑</a-button> -->
        <a-button @click="showDeleteConfirm" type="primary">删除</a-button>
      </a-button-group>
    </div>

    <!-- Dialog Begin -->
    <a-modal
      v-model="addCollegeVisible"
      :title="editVisible ? '编辑学院' : '添加学院'"
      @ok="addCollege"
      :maskClosable="false"
    >
      <a-form-model
        :model="addCollegeForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="formRules"
      >
        <a-form-model-item label="学院名称" prop="collegeName">
          <a-input
            placeholder="请输入学院名称"
            v-model="addCollegeForm.collegeName"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="学院简介" prop="collegeDesc">
          <a-textarea
            placeholder="请输入学院简介"
            :auto-size="{ minRows: 3, maxRows: 8 }"
            v-model="addCollegeForm.collegeDesc"
          ></a-textarea>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
      v-model="addMajorVisible"
      :title="editVisible ? '编辑专业' : '添加专业'"
      @ok="addMajor"
      :maskClosable="false"
    >
      <a-form-model
        :model="addMajorForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="formRules"
      >
        <a-form-model-item label="学院名称" prop="subOrgName">
          <a-input
            placeholder="请输入学院名称"
            v-model="addMajorForm.subOrgName"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="专业名称" prop="majorName">
          <a-input
            placeholder="请输入专业名称"
            v-model="addMajorForm.majorName"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="专业简介" prop="majorDesc">
          <a-textarea
            placeholder="请输入专业简介"
            :auto-size="{ minRows: 3, maxRows: 8 }"
            v-model="addMajorForm.majorDesc"
          ></a-textarea>
        </a-form-model-item>
        <a-form-model-item label="开设时间" prop="startDate">
          <a-date-picker v-model="addMajorForm.startDate" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { treeNodeTiles } from "@/utils/antComponent";
import axios from "@/utils/axios";
// import errHandler from "@/utils/errorHandler";
import { mapMutations, mapState } from "vuex";

export default {
  name: "InstitutionTree",
  data() {
    return {
      title: "",
      selectedKeys: "",
      treeData: [
        {
          title: "陕西师范大学",
          key: "1",
          children: [
            {
              title: "计算机科学学院",
              key: "1-1",
              children: [
                { title: "人工智能", key: "1-1-1", isLeaf: true },
                { title: "软件工程", key: "1-1-2", isLeaf: true },
              ],
            },
            { title: "材料科学与工程学院", key: "1-2", isLeaf: true },
          ],
        },
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      addCollegeVisible: false,
      addCollegeForm: {
        collegeName: "",
        collegeDesc: "",
      },
      addMajorVisible: false,
      addMajorForm: {
        subOrgName: "",
        majorName: "",
        majorDesc: "",
        startDate: "",
      },
      editVisible: false,
      // removeVisible: false,
      currentNode: "1",
      formRules: {
        collegeName: [{ required: true, min: 3, message: "学院名称最少3个字" }],
        collegeDesc: [{ required: true, message: "学院简介不能为空" }],
        subOrgName: [{ required: true, min: 3, message: "学院名称最少3个字" }],
        majorName: [{ required: true, min: 3, message: "专业名称最少3个字" }],
        majorDesc: [{ required: true, message: "专业简介不能为空" }],
        startDate: [{ required: true, message: "开办时间不能为空" }],
      },
    };
  },
  computed: {
    ...mapState({
      sid: (state) => state.public.sid,
      oid: (state) => state.public.oid,
      subOrgId: (state) => state.admin.subOrgId,
      schoolInfo: (state) => state.admin.schoolInfo,
    }),
    ...mapMutations({}),
  },
  mounted() {
    this.getTreeData();
  },
  methods: {
    showDeleteConfirm() {
      let that = this;
      this.$confirm({
        title: "您确定要删除吗?",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          // console.log("OK");
          // console.log(that.selectedKeys);
          // console.log(that.schoolInfo);
          let slk = that.selectedKeys[0];
          // console.log(i, j, k);
          if (slk.split("-")[2] === undefined) {
            // console.log("okk");
            let url = `pc/v1/organizations/${that.oid}/suborgs`;
            // console.log(url);

            let subOrgName = that.schoolInfo[slk.split("-")[1] - 1].subOrgName;
            // console.log(subOrgName);
            axios
              .delete(url, {
                data: {
                  subOrgName: subOrgName,
                },
              })
              .then(
                function (res) {
                  console.log(res);
                },
                function (err) {
                  console.log(err);
                }
              );
          } else {
            // console.log("okk");
            let subOrgId = that.schoolInfo[slk.split("-")[1] - 1]._id;
            // console.log(subOrgId);
            let url = `pc/v1/organizations/${that.oid}/suborgs/${subOrgId}`;
            // console.log(url);
            let subOrgName = that.schoolInfo[slk.split("-")[1] - 1].subOrgName;
            // console.log(subOrgName);
            let majorName =
              that.schoolInfo[slk.split("-")[1] - 1].majors[
                slk.split("-")[2] - 1
              ].majorName;
            // console.log(majorName);
            axios
              .delete(url, {
                data: {
                  subOrgName,
                  majorName,
                },
              })
              .then(
                function (res) {
                  console.log(res);
                },
                function (err) {
                  console.log(err);
                }
              );
          }
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    getTreeData() {
      let that = this;
      this.treeData = [];
      // console.log(this.oid);
      const url = `/pc/v1/organizations/${this.oid}`;
      // const url="/pc/v1/organizations/5facabb2cf3bb2002b4b3f38"
      axios.get(url).then(
        function (res) {
          // console.log(res);
          const data = res.data.data.organization;
          // console.log(data);
          let treeData = [];
          // console.log(data.data);
          treeData.push({
            title: data.organizationName,
            key: "1",
            children: [],
          });
          let subOrgs = data.subOrgs;
          that.$store.commit("admin/getSchoolInfo", subOrgs);
          // console.log(subOrgs);
          for (let i = 0; i < subOrgs.length; i++) {
            // console.log(subOrgs[i]);
            treeData[0].children.push({
              title: subOrgs[i].subOrgName,
              key: `1-${i + 1}`,
              children: [],
            });
            let majors = subOrgs[i].majors;
            for (let j = 0; j < majors.length; j++) {
              treeData[0].children[i].children.push({
                title: majors[j].majorName,
                key: `1-${i + 1}-${j + 1}`,
                children: [],
                isLeaf: true,
              });
            }
          }
          that.treeData = treeData;
        },
        function (err) {
          console.log(err);
        }
      );
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        // to request data

        // setTimeout(() => {
        //   treeNode.dataRef.children = [
        //     { title: "Child Node", key: `${treeNode.eventKey}-0` },
        //     { title: "Child Node", key: `${treeNode.eventKey}-1` },
        //   ];
        //   this.treeData = [...this.treeData];
        //   resolve();
        // }, 1000);
      });
    },
    onSelect(selectedKeys, info) {
      // console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
      // console.log(selectedKeys[0].split("-")[0],selectedKeys[0].split("-")[1],selectedKeys[0].split("-")[2]);
      this.title = info.selectedNodes[0].data.props.dataRef.title;
      // console.log(major)；
      let that = this;
      if (selectedKeys[0].split("-")[2] === undefined) {
        this.$store.commit("admin/getSubOrgId", this.title);
      } else {
        axios
          .get(`pc/v1/classes`, {
            params: {
              major: this.title,
            },
          })
          .then(
            function (res) {
              // console.log(res);
              let data = res.data.data.classes;
              // console.log(data);
              that.$store.commit("admin/getClassTable", data);
            },
            function (err) {
              console.log(err);
            }
          );
      }
    },
    onChange() {},
    addCollege() {
      const { collegeName, collegeDesc } = this.addCollegeForm;
      const requestData = {
        subOrgName: collegeName,
        subOrgIntro: collegeDesc,
      };
      // const url = `pc/v1/organizations/${this.sid}/suborgs`;
      const url = `pc/v1/organizations/${this.oid}/suborgs`;
      axios.post(url, requestData).then(
        function (res) {
          console.log(res);
        },
        function (err) {
          console.log(err);
        }
      );
      this.addCollegeVisible = false;
    },
    addMajor() {
      const { subOrgName, majorName, majorDesc, startDate } = this.addMajorForm;
      let data = {
        subOrgName: subOrgName,
        majorName: majorName,
        majorIntro: majorDesc,
        startDate: startDate,
      };
      const url = `pc/v1/organizations/${this.oid}/suborgs/${this.subOrgId}`;
      axios.post(url, data).then(
        function (res) {
          console.log(res);
        },
        function (err) {
          console.log(err);
        }
      );
      this.addMajorVisible = false;
    },
    edit() {
      const nodeTile = treeNodeTiles(this.currentNode);
      if (nodeTile === 1) {
        // give some tips
        return;
      }
      if (nodeTile === 2) {
        this.editVisible = true;
        this.addCollegeVisible = true;
        return;
      }
      if (nodeTile === 3) {
        this.editVisible = true;
        this.addMajorVisible = true;
      }
    },
    remove() {},
  },
};
</script>

<style scoped>
.btn-area {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
}
</style>