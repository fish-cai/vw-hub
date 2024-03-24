<template>
  <div ref="chart" style="width: 100%; height: 600px"></div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import chinaMap from "../assets/china.json";

const chart = ref();
const items = ref([]);
items.value;
onMounted(() => {
  init();
});
const init = () => {
  const myChart = echarts.init(chart.value);
  echarts.registerMap("china", chinaMap);
  const options = {
    series: [
      {
        type: "map",
        map: "china",
        data: items.value,
        zoom: 1.2,
        label: {
          //标签样式
          show: true,
          color: "#fff",
          fontSize: 10
        },
        itemStyle: {
          //地图区域样式
          borderColor: "#19bbee",
          borderWidth: 1,
          areaColor: "#219edb"
        },
        emphasis: {
          //高亮状态下的样式
          label: {
            color: "#000",
            fontSize: 11
          },
          itemStyle: {
            borderColor: "#fff",
            areaColor: "#1bc1ad"
          }
        }
      }
    ],
    visualMap: {
      min: 1,
      max: 100,
      text: ["高", "低"],
      realtime: false,
      calculable: true,
      inRange: {
        color: ["#219edb", "yellow", "orangered"]
      },
      textStyle: {
        color: "#fff"
      }
    }
  };
  myChart.setOption(options);
  window.addEventListener("resize", () => myChart.resize());
};
</script>
<style scoped></style>