<template>
  <div class="map">
    <div ref="container"></div>
  </div>
</template>
<script setup name="ADemo">
import axios from "axios";
import * as echarts from "echarts";
import "echarts-extension-amap";
import { ref, shallowRef, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { inject } from "vue";

const baseUrl = inject("baseUrl");
const AMap = window.AMap;
let container = ref();
let map = shallowRef("null");
let myChart = shallowRef("null");
const flyLineData = ref([]);
const lineData = ref([]);
const pointData = ref([]);

const queryParams = ref("");

// 使用 useRoute 获取当前路由对象
const route = useRoute();
onMounted(() => {
  //先加载要查看的数据
  const resultId = route.query["resultId"];
  if (resultId == undefined) {
    ElMessage("请先选择方案");
  }
  loadViewData();
  async function loadViewData() {
    const params = {
      resultId: resultId,
    };
    await axios
      .get(baseUrl + "vwHubInput/view", { params })
      .then((data) => {
        const resData = data.data.data;
        const values = Object.values(resData.lineRes);
        console.log(values);
        values.forEach((item) => {
          console.log(item.data);
          const lineItem = {
            type: "lines",
            coordinateSystem: "amap",
            zlevel: 2,
            lineStyle: {
              normal: {
                width: 2, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
              },
            },
            data: item.data,
          };
          lineData.value.push(lineItem);
        });
        // flyLineData.value = resData.lineRes;
        console.log("line", lineData.value);
        pointData.value = resData.pointRes;

        //数据请求完 再加载地图
        Object.defineProperty(container.value, "clientWidth", {
          get: function () {
            return 2000;
          },
        });
        Object.defineProperty(container.value, "clientHeight", {
          get: function () {
            return 2500;
          },
        });
        newCharts();
      })
      .catch((error) => {
        console.log(error);
        ElMessage(error);
      });
  }
  // Object.defineProperty(container.value, "clientWidth", {
  //   get: function () {
  //     return 1000;
  //   },
  // });
  // Object.defineProperty(container.value, "clientHeight", {
  //   get: function () {
  //     return 800;
  //   },
  // });
});
const newCharts = () => {
  myChart.value = echarts.init(container.value);
  // console.log(pointData.value);
  // console.log(flyLineData.value);
  const option = {
    // 高德地图的配置
    amap: {
      maxPitch: 60,
      pitch: 0, //45 俯仰角
      viewMode: "3D",
      zoom: 5,
      zooms: [4, 22],
      mapStyle: "amap://styles/darkblue", //地图主题
      center: [120.38, 36.08],
    },
    animation: true,
    series: [
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
            color: "black",
          },
        },
        data: pointData.value,
      },
    ].concat(lineData.value),
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
<style scoped></style>
