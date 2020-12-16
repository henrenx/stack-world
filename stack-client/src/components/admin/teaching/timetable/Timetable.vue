<template>
  <a-row class="container">
    <a-col :span="18" :push="3">
      <h2 style="text-align: center">上课时间表</h2>
      <a-table
        :columns="columns"
        :data-source="data"
        bordered
        rowKey="index"
        :pagination="false"
      >
        <template #summerOperation="record">
          <a-button type="link" @click="editSummerTime(record)">编辑</a-button>
        </template>
        <template #winterOperation="record">
          <a-button type="link" @click="editWinterTime(record)">编辑</a-button>
        </template>
      </a-table>
    </a-col>
    <a-modal
      v-model="visible"
      title="编辑"
      @ok="hideModal"
      :maskClosable="false"
    >
      <a-form-model
        :model="changetime"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="formRules"
      >
        <a-form-model-item label="上课时间" prop="start">
          <a-input
            placeholder="请输入上课时间"
            v-model="changetime.start"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="下课时间" prop="end">
          <a-input
            placeholder="请输入下课时间"
            v-model="changetime.end"
          ></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-row>
</template>

<script>
export default {
  data() {
    const columns = [
      { title: "课次名称", dataIndex: "sessionName", align: "center" },
      {
        title: "夏令时",
        align: "center",
        children: [
          {
            title: "上课时间",
            align: "center",
            dataIndex: "summerSchoolTime",
          },
          {
            title: "下课时间",
            align: "center",
            dataIndex: "summerBreakTime",
          },
          {
            title: "操作",
            align: "center",
            scopedSlots: { customRender: "summerOperation" },
          },
        ],
      },
      {
        title: "冬令时",
        align: "center",
        children: [
          {
            title: "上课时间",
            align: "center",
            dataIndex: "winterSchoolTime",
          },
          {
            title: "下课时间",
            align: "center",
            dataIndex: "winterBreakTime",
          },
          {
            title: "操作",
            align: "center",
            scopedSlots: { customRender: "winterOperation" },
          },
        ],
      },
    ];
    const data = [
      {
        index: "0",
        sessionName: "第1、2节课",
        summerSchoolTime: "08:00",
        summerBreakTime: "09:50",
        winterSchoolTime: "08:00",
        winterBreakTime: "09:50",
      },
      {
        index: "1",
        sessionName: "第3、4节课",
        summerSchoolTime: "10:10",
        summerBreakTime: "12:00",
        winterSchoolTime: "10:10",
        winterBreakTime: "12:00",
      },
      {
        index: "2",
        sessionName: "第5、6节课",
        summerSchoolTime: "14:30",
        summerBreakTime: "16:20",
        winterSchoolTime: "14:30",
        winterBreakTime: "16:20",
      },
      {
        index: "3",
        sessionName: "第7、8节课",
        summerSchoolTime: "16:40",
        summerBreakTime: "19:00",
        winterSchoolTime: "16:40",
        winterBreakTime: "19:00",
      },
      {
        index: "4",
        sessionName: "第9、10节课",
        summerSchoolTime: "19:20",
        summerBreakTime: "21:10",
        winterSchoolTime: "19:20",
        winterBreakTime: "21:10",
      },
    ];
    return {
      columns,
      data,
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      changetime: {
        start: "",
        end: "",
        tag: "",
        id: "",
      },
      currentNode: "1",
      formRules: {
        start: [{ required: true, message: "上课时间不能为空" }],
        end: [{ required: true, message: "下课时间不能为空" }],
      },
    };
  },
  methods: {
    hideModal() {
      const { start, end, id, tag } = this.changetime;
      if (tag === "summer") {
        this.data[id].summerSchoolTime = start;
        this.data[id].summerBreakTime = end;
        let change = this.data[id];
        this.data.splice(id, 1, change);
      } else {
        this.data[id].winterSchoolTime = start;
        this.data[id].winterBreakTime = end;
        let change = this.data[id];
        this.data.splice(id, 1, change);
      }
      this.visible=false;
    },
    editSummerTime(record) {
      this.changetime.id = record.index;
      this.changetime.start = record.summerSchoolTime;
      this.changetime.end = record.summerBreakTime;
      this.changetime.tag = "summer";
      this.visible = true;
    },
    editWinterTime(record) {
      this.changetime.id = record.index;
      this.changetime.start = record.winterSchoolTime;
      this.changetime.end = record.winterBreakTime;
      this.changetime.tag = "winter";
      this.visible = true;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
  height: 100%;
}
</style>