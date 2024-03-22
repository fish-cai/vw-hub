<template>
  <Upload/>
  <Table/>
</template>
<script lang="ts">
import Upload from "./components/Upload.vue";
import Table from './components/Table.vue'
export default {
  name: "App",
  components: {Upload,Table},
};
</script>



<style scoped>
</style>
