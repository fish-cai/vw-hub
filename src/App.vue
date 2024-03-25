<template>
  <!-- <Upload :router="router"/> -->
  <!-- <vw-hub-map/> -->
  <router-view></router-view>
</template>
<script lang="ts">
// import Upload from "./components/Upload.vue";
// import router from '@/router'
import { useRouter } from 'vue-router';

export default {
  name: "App",
  // components: {Upload},
  setup(){
    const router = useRouter()
    console.log("app.vue router",router)
    return {router}
  }
};
</script>

<style scoped></style>
