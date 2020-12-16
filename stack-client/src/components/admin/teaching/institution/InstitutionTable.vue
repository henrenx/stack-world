<template>
  <div>
    <a-row class="btn-area">
      <a-col :span="5">
        <a-input-search
          placeholder="班级名称"
          v-model="className"
          enter-button
          @search="onSearch"
        />
      </a-col>
      <a-col :span="11" :push="16"></a-col>
      <a-col :span="8" class="btn">
        <a-button type="primary" @click="addMulClass">批量添加班级</a-button>
        <a-button type="primary" @click="addClass">添加班级</a-button>
        <a-button type="primary" @click="deleteMul">批量删除</a-button>
      </a-col>
    </a-row>
    <a-modal
      title="添加班级"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        :model="addClass"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="班级名称" prop="className">
          <a-input
            placeholder="请输入班级名称"
            v-model="addClass.className"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="学院" prop="college">
          <a-input placeholder="请输入学院" v-model="addClass.subOrg"></a-input>
        </a-form-model-item>
        <a-form-model-item label="专业" prop="major">
          <a-input placeholder="请输入专业" v-model="addClass.major"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-table
      rowKey="_id"
      :pagination="{
        total: 50,
        'show-size-changer': true,
        'show-quick-jumper': true,
      }"
      :bordered="true"
      :row-selection="{
        selectedRowKeys: selectedClasses,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="classList"
    >
      <template #operation="record">
        <a-button type="link" @click="viewClassInfo(record._id)">详情</a-button>
        <a-button type="link">编辑</a-button>
        <a-button type="link">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import axios from "@/utils/axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      className: "",
      visible: false,
      confirmLoading: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
      rules: {
        className: [
          {
            required: true,
            min: 1,
            message: "班级名不能为空",
          },
        ],
        subOrg: [
          {
            required: true,
            min: 1,
            message: "学院名不能为空",
          },
        ],
        major: [
          {
            required: true,
            min: 1,
            message: "学院名不能为空",
          },
        ],
      },
      addClassInfo: {
        className: "",
        subOrg: "",
        major: "",
        org: "",
        tags: [],
        staff: {
          manager: "",
        },
        students: [],
      },
      studentInfo: {
        studentID: "",
        studentName: "",
        remark: "",
      },
      columns: [
        {
          title: "班级名称",
          dataIndex: "className",
          align: "center",
        },
        {
          title: "学院",
          dataIndex: "subOrg",
          align: "center",
        },
        {
          title: "专业",
          dataIndex: "major",
          align: "center",
        },
        {
          title: "学生数量",
          dataIndex: "studentNum",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "operation" },
        },
      ],
      selectedClasses: [],
      classList: [
        {
          _id: "1",
          className: "软工1702",
          subOrg: "计算机科学学院",
          major: "软件工程",
          studentNum: 10,
        },
        {
          _id: "2",
          className: "软工1701",
          subOrg: "计算机科学学院",
          major: "软件工程",
          studentNum: 40,
        },
        {
          _id: "3",
          className: "计创1701",
          subOrg: "计算机科学学院",
          major: "计算机科学与技术（创新实验班）",
          studentNum: 40,
        },
        {
          _id: "4",
          className: "计创1701",
          subOrg: "计算机科学学院",
          major: "计算机科学与技术（创新实验班）",
          studentNum: 40,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      classTable: (state) => state.admin.classTable,
      schoolInfo: (state) => state.admin.schoolInfo,
      subOrgId: (state) => state.admin.subOrgId,
    }),
  },
  mounted() {},
  methods: {
    addMulClass() {
      console.log(this.classTable);
      console.log(this.schoolInfo);
      console.log(this.subOrgId);
    },
    addClass() {
      this.visible = true;
    },
    deleteMul() {},

    onSelectChange(selectedKeys) {
      this.selectedClasses = selectedKeys;
    },
    onSearch() {
      let that = this;
      that.classList = [];
      axios
        .get("/pc/v1/classes", {
          params: {
            className: this.className,
          },
        })
        .then(
          function (res) {
            console.log(res);
            let classes = res.data.classes[0];
            that.classList.push({
              _id: classes._id,
              className: classes.className,
              subOrg: classes.subOrg,
              major: classes.major,
              studentNum: classes.students.length,
            });
          },
          function (err) {
            console.log(err);
          }
        );
    },
    handle() {
      this.$store.commit("changeState", true);
    },
    viewClassInfo(classId) {
      this.$router.push({
        name: "admin_classinfo",
        query: { classId: classId },
      });
    },
    handleOk(e) {
      console.log(e);
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      console.log(e);
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.btn-area {
  padding-bottom: 10px;
}

.btn .ant-btn {
  margin: 0 5px;
}
</style>