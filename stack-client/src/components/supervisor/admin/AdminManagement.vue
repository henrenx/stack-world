<template>
  <div>
    <a-row style="margin: 30px">
      <a-col :span="4">
        <a-select v-model="school" @change="changeInfo" style="width: 100%">
          <a-select-option
            v-for="(item, index) in schoolList"
            :key="index"
            :value="item.schoolName"
            >{{ item.schoolName }}</a-select-option
          >
        </a-select>
      </a-col>
      <a-col :span="4" :push="18">
        <a-button type="primary" @click="addAdmin" v-show="orgName"
          >添加管理</a-button
        >
      </a-col>
    </a-row>
    <a-modal
      title="添加管理"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        :model="addUserInfo"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="昵称" prop="name">
          <a-input
            placeholder="请输入昵称"
            v-model="addUserInfo.name"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="email">
          <a-input
            placeholder="请输入邮箱"
            v-model="addUserInfo.email"
          ></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-row style="margin: 30px">
      <a-col :span="6" v-for="(item, index) in userInfoList" :key="index">
        <a-card
          hoverable
          style="
            width: 300px;
            margin-bottom: 10px;
            justify-content: space-around;
          "
          align="center"
        >
          <a-avatar :size="64" icon="user" src id="icon" />
          <a-card-meta :description="item.name" class="card_info"></a-card-meta>
          <a-card-meta :description="item.email"></a-card-meta>
          <template slot="actions" class="ant-card-actions">
            <a-button type="link" block @click="newPassword(item._id)" 
              >重置密码</a-button
            >
            <a-button type="link" block @click="changeActive(item._id)">{{
              item.active ? "冻结管理" : "激活管理"
            }}</a-button>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import axios from "@/utils/axios";
export default {
  data() {
    return {
      school: "请选择学校",
      orgName: "",
      visible: false,
      confirmLoading: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
      rules: {
        name: [
          {
            required: true,
            min: 1,
            message: "昵称最少2个字",
          },
        ],
        email: [{ required: true, message: "邮箱不能为空" }],
      },
      addUserInfo: {
        name: "",
        email: "",
      },
      schoolList: [
        {
          schoolId: "snnu",
          schoolName: "陕西师范大学",
        },
      ],
      userInfoList: [
        {
          _id: "123",
          name: "青空",
          email: "2756878164@qq.com",
          active: false,
        },
      ],
    };
  },
  mounted() {
    this.getSchool();
  },
  methods: {
    newPassword(value) {
      console.log(value);
      // let that=this;
      // axios.("")
    },
    changeActive(value) {
      console.log(value);
    },
    changeInfo(value) {
      // console.log(value);

      let that = this;
      this.userInfoList = [];
      axios
        .get("/pc/v1/users", {
          params: {
            org_name: value,
            role: "orgAdmin",
          },
        })
        .then(
          function (res) {
            console.log(res.data.data);
            let data = res.data.data.users;
            that.userInfoList = data;
          },
          function (err) {
            console.log(err);
          }
        );
      this.orgName = value;
    },
    getSchool() {
      let that = this;
      this.schoolList = [];
      axios.get("/pc/v1/organizations").then(
        function (res) {
          // console.log(res);
          let list = res.data.data.organizations;
          // console.log(list);
          for (var item of list) {
            that.schoolList.push({
              schoolId: item.id,
              schoolName: item.organizationName,
            });
          }
        },
        function (err) {
          console.log(err);
        }
      );
      // console.log(this.$store.super);
      // console.log(this.schoolList);
    },

    addAdmin() {
      // console.log("addAdmin");
      this.visible = true;
    },
    disabledAdmin() {
      console.log("disabledAdmin");
      document.getElementById("icon").style.background = "#CCCCCC";
    },

    handleOk() {
      let that = this;
      let name = this.addUserInfo.name;
      let email = this.addUserInfo.email;
      let org_name = this.orgName;

      let admin = {
        name: name,
        email: email,
        password: "12345678",
        passwordConfirm: "12345678",
        org_name: org_name,
        role: "orgAdmin",
      };

      axios.post("/pc/v1/users/signup", admin).then(
        function (res) {
          console.log(res);
          if (res.status === "scccess") {
            that.$message.success("添加成功");
          }
        },
        function (err) {
          console.log(err);
          that.$message.error("添加失败");
        }
      );

      // this.userInfoList.push(user);
      // console.log(this.userInfoList);
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
        this.addUserInfo.name = "";
        this.addUserInfo.email = "";
      }, 2000);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },
  },
};
</script>

<style>
.card_info {
  margin: 10px;
}

#icon {
  background-color: #1da57a;
}
</style>