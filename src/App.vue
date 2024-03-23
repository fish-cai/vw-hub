<template>
  <Upload/>
  <!-- <Table/> -->
  <!-- <Person/> -->
  <router-view></router-view>
</template>
<script lang="ts">
import Upload from "./components/Upload.vue";
import Table from './components/Table.vue'
import Person from './components/Person.vue'
export default {
  name: "App",
  components: {Upload,Table,Person},
};
</script>



<style scoped>
</style>
