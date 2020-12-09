<template>
  <a-row style="height: 100%">
    <a-row class="box">
      <a-row
        id="components-slider-demo-mark"
        style="height: 20%"
        type="flex"
        align="middle"
      >
        <a-col :span="15" :offset="2">
          <a-slider
            :marks="marks"
            v-model="slidervalue"
            :max="50"
            @afterChange="afterChange"
          />
        </a-col>
        <a-col :span="5" :offset="1">
          <a-button type="primary" @click="addmarks"> 添加事件 </a-button>
          &nbsp;&nbsp;
          <a-button type="primary" @click="deletemarks"> 删除事件 </a-button>
        </a-col>
      </a-row>
      <br />
      <br />
      <a-row type="flex" justify="center" align="middle" class="contextstyle">
        <a-empty :description="false" v-if="isempty" />
        <component :is="componentId" v-else></component>
      </a-row>
    </a-row>
    <a-modal
      title="选择事件"
      v-model="modalvisible"
      @ok="handleOk"
      :zIndex="10001"
    >
      <div>
        <a-radio-group
          v-model="componentId"
          default-value="PreTeaching"
          button-style="solid"
          size="small"
        >
          <a-space>
            <a-radio-button value="PreTeaching"> 讲课 </a-radio-button>
            <a-radio-button value="PreQuestion"> 提问 </a-radio-button>
            <a-radio-button value="PreCompete"> 抢答 </a-radio-button>
            <a-radio-button value="PreVote"> 投票 </a-radio-button>
            <a-radio-button value="PreSign"> 签到 </a-radio-button>
            <a-popover trigger="hover">
              <template slot="content">
                <p>视频,word,pdf,excel,图片等</p>
              </template>
              <a-radio-button value="PreDocument"> 文件下发 </a-radio-button>
            </a-popover>
            <a-radio-button value="PreTest"> 随堂测试 </a-radio-button>
          </a-space>
        </a-radio-group>
      </div>
    </a-modal>
  </a-row>
</template>
<script>
import PreTeaching from "./preselect/PreTeaching.vue";
import PreQuestion from "./preselect/PreQuestion.vue";
import PreCompete from "./preselect/PreCompete.vue";
import PreVote from "./preselect/PreVote.vue";
import PreSign from "./preselect/PreSign.vue";
import PreDocument from "./preselect/PreDocument.vue";
import PreTest from "./preselect/PreTest.vue";
export default {
  components: {
    PreTeaching,
    PreQuestion,
    PreCompete,
    PreVote,
    PreSign,
    PreDocument,
    PreTest,
  },
  data() {
    return {
      marks: {},
      event: {
        PreVote: "投票",
        PreSign: "签到",
        PreCompete: "抢答",
        PreQuestion: "提问",
        PreTeaching: "讲课",
        PreTest: "随堂测试",
        PreDocument: "文件下发",
      },
      slidervalue: 5,
      modalvisible: false,
      selectevent: "",
      componentId: "PreTeaching",
    };
  },
  computed: {
    isempty() {
      return !!Object.keys(this.marks).length;
    },
  },
  methods: {
    afterChange(value) {
      let marksvalue = this.marks[value];
      if (marksvalue) {
        let findmarks = marksvalue.label.children[2].text;
        let result=Object.keys(this.event).find(item=>{
          return this.event[item]===findmarks;
        })
        this.componentId = result;
      }
    },
    addmarks() {
      if (this.marks[this.slidervalue]) {
        this.$message.info("该时间点已存在事件，请删除后再添加。");
      } else {
        this.modalvisible = true;
      }
    },
    deletemarks() {
      const that = this;
      this.$confirm({
        title: "确定删除此事件吗?",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        zIndex: 10001,
        onOk() {
          delete that.marks[that.slidervalue];
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    callback(val) {
      console.log(val);
    },
    handleOk() {
      const value = this.slidervalue + "分钟";
      this.marks[this.slidervalue] = {
        label: (
          <span>
            {value}
            <br />
            {this.event[this.componentId]}
          </span>
        ),
      };
      this.modalvisible = false;
    },
  },
};
</script>

<style>
.box {
  background: #fff;
  padding: 10px;
  margin: 10px;
  height: calc(100% - 20px);
}

.contextstyle {
  height: 65%;
  width: 90%;
  /* background: #f0f2f5; */
  /* border:2px solid #ccc; */
  margin-left: 5%;
}
.try {
  width: 100%;
  height: 100%;
  padding: 30px;
}

.precompeteclass {
  background: #fff;
  height: 100%;
  width: 100%;
}

.setcard {
  width: 90%;
  height: 100%;
}
</style>