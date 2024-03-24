<template>
  <div class="app-container">
    <div id="map" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup name="AmapDemo">
import AMapLoader from "@amap/amap-jsapi-loader";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
// 这里需要安装 echarts-extension-amap 插件; 否则会报错(Unkown coordinate system amap)
// 安装命令: npm install echarts-extension-amap --save
import "echarts-extension-amap"; // 高德地图坐标系插件

const option = {
  amap: {
    // 高德地图配置
    center: [120.38, 36.08], // 地图中心点
    zoom: 5, // 地图缩放级别
    viewMode: "3D", // 地图模式
    resizeEnabled: true, // 是否监控地图容器尺寸变化
    mapStyle: "amap://styles/dark", // 地图样式
    pitch: 15, //视角高度
    skyColor: "#33216a", //天空颜色
  },
  animation: true, //是否开启动画
  series: [
    {
      type: "lines",
      coordinateSystem: "amap",
      polyline: true,
      lineStyle: {
        normal: {
          color: "#ff6600",
          width: 1,
          opacity: 0.6,
          curveness: 0.2,
        },
      },
      data: [
        {
          fromName: "北京",
          toName: "上海",
          coords: [
            [116.4551, 40.2539],
            [121.4648, 31.2891],
          ],
        },
        // 添加更多的飞线数据
      ],
    },
    {
      type: "lines", // 线图(在Echarts的配置项手册中可以查到)
      coordinateSystem: "amap", // 高德地图坐标系
      effect: {
        // 线特效配置
        show: true, // 是否显示特效
        period: 3, // 特效动画时间
        trailLength: 0, // 特效尾迹长度
        symbol: "arrow", // 特效图形
        symbolSize: 15, // 特效图形大小
      },
      lineStyle: {
        // 线样式
        normal: {
          // 正常状态
          color: "#FF0000", // 线颜色
          width: 3, // 线宽
          opacity: 0.5, // 线透明度
          curveness: -0.2, // 线曲度
        },
      },
      data: [
        // 线数据
        [
          ["116.372655", "40.036025"], // 起点
          ["118.79901", "31.98436"], // 终点
        ],
      ],
    },
  ],
};

onMounted(() => {
  initMap();
});

function initMap() {
  // window._AMapSecurityConfig = {
  //     securityJsCode: 'xxxxxxxxx', // 高德地图的code
  // }
  AMapLoader.load({
    key: "bd098fc0c2ecf809ccfacbb0e3a7d646", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    let chart = echarts.init(document.getElementById("map"));
    chart.setOption(option);
    chart.getModel().getComponent("amap").getAMap(); //获取高德地图实例
  });
}
</script>
<style scoped></style>
