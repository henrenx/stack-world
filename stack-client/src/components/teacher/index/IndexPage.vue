<template>
  <a-row>
    <a-row type="flex" justify="space-around">
      <a-col v-for="item in oneWeek" :key="item.title" :span="3">
        <p>{{ item.title }}</p>
        <div class="week-day"></div>
      </a-col>
    </a-row>
  </a-row>
</template>

<script>
import moment from "moment";

export default {
  data() {
    let oneWeek = [
      { title: "一", titleEn: "Mon" },
      { title: "二", titleEn: "Tue" },
      { title: "三", titleEn: "Wed" },
      { title: "四", titleEn: "Thu" },
      { title: "五", titleEn: "Fri" },
      { title: "六", titleEn: "Sat" },
      { title: "七", titleEn: "Sun" },
    ];
    return {
      oneWeek,
    };
  },
  methods: {
    initOneWeek() {
      let instance = moment();
      this.oneWeek.forEach((item, index) => {
        instance.add(1, "d");
        item.day = instance.date();
      });
    },
  },
  created() {},
};
</script>

<style scoped>
.week-day {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: #FFF;
  
}
</style>