<template>
  <a-row type="flex" justify="start" align="middle" style="height: 100%">
    <a-col :span="15" :offset="2">
      <a-form-model
        layout="inline"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="课程描述">
          <a-input
            placeholder="本节课重难点"
            v-model="form.desc1"
            allow-clear
            @change="onChange"
          />
        </a-form-model-item>
        <a-form-model-item label="时长">
          <a-input placeholder="50" v-model="form.time" />
        </a-form-model-item>
      </a-form-model>
    </a-col>
    <a-col :span="6" :offset="1">
      <a-button type="primary" @click="save"> 保存 </a-button>
      &nbsp;&nbsp;&nbsp;
      <a-button type="primary" @click="pptx"> 上传 </a-button>
      &nbsp;&nbsp;&nbsp;
      <a-button type="primary" :disabled="true" @click="publish"> 发布 </a-button>
    </a-col>
  </a-row>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 15 },
      form: {
        desc1: "",
        time: 50,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
    },
    onChange(e) {
      console.log(e);
    },
    save(){

    },
    pptx(){

    },
    publish(){

    }
  },
};
</script>
<style>
</style>