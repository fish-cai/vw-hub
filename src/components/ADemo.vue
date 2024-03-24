<template>
  <div class="map">
    <div ref="container"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import "echarts-extension-amap";
import { ref, shallowRef, onMounted } from "vue";
const AMap = window.AMap;
let container = ref();
let map = shallowRef("null");
let myChart = shallowRef("null");
const flyLineData = ref([]);
const pointData = ref([]);

onMounted(() => {
  Object.defineProperty(container.value, "clientWidth", {
    get: function () {
      return 1000;
    },
  });
  Object.defineProperty(container.value, "clientHeight", {
    get: function () {
      return 800;
    },
  });

  newCharts();
});
const newCharts = () => {
  myChart.value = echarts.init(container.value);
  const option = {
    // 高德地图的配置
    amap: {
      maxPitch: 60,
      pitch: 0, //45 俯仰角
      viewMode: "3D",
      zoom: 14,
      zooms: [4, 22],
      mapStyle: "amap://styles/darkblue", //地图主题
      center: [120.38, 36.08],
    },
    animation: true,
    series: [
      {
        type: "lines",
        coordinateSystem: "amap",
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: "arrow", //箭头图标
          symbolSize: 5, //图标大小
          color: "#fff",
        },
        lineStyle: {
          normal: {
            width: 1, //尾迹线条宽度
            opacity: 1, //尾迹线条透明度
            curveness: 0.3, //尾迹线条曲直度
            color: "red",
          },
        },
        data: [
          {
            odCount: "3",
            coords: [
              [120.311771, 36.064771],
              [120.432771, 36.106771],
            ],
          },
          {
            odCount: "4",
            coords: [
              [120.311771, 36.064771],
              [120.417716, 36.198771],
            ],
          },
        ],
      },
      {
        type: "effectScatter",
        coordinateSystem: "amap",
        zlevel: 2,
        rippleEffect: {
          //涟漪特效
          period: 4, //动画时间，值越小速度越快
          brushType: "stroke", //波纹绘制方式 stroke, fill
          scale: 4, //波纹圆环最大限制，值越大波纹越大
        },
        symbol: "circle",
        symbolSize: 4,
        itemStyle: {
          normal: {
            show: false,
            color: "yellow",
          },
        },
        data: [
          {
            name: "青岛站",
            value: [120.311771, 36.064771],
          },
          {
            name: "远洋风景",
            value: [120.432771, 36.106771],
          },
          {
            name: "十梅庵公园",
            value: [120.417716, 36.198771],
          },
        ],
      },
    ],
  };
  myChart.value.setOption(option);
  // 需要注意的是amap，这里的配置就是针对 高德地图的配置了，而支持哪些配置可以在高德地图api查看
  // 通过echarts实例获取地图组件 高德getAmap() 百度getBmap()
  map.value = myChart.value.getModel().getComponent("amap").getAMap();
  // map.value = new AMap.Map("container", {});
  tools();
  // map.value.on("complete", () => {
  //   // console.log("complete");
  //   // 确保高德地图渲染的时候，echarts同时也需要再次渲染一次，保持位置的同步
  //   // myChart.value.setOption(option);
  // });
};
// 高德工具
const tools = () => {
  let toolBar = new AMap.ToolBar({
    visible: true,
    position: {
      top: "110px",
      right: "40px",
    },
  });
  map.value.addControl(toolBar);
};
</script>
