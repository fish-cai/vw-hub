<template>
  <div id="app"></div>
  <Upload :router="router" />
  <!-- <Table/> -->
  <!-- <Person/> -->
</template>
<script lang="ts">
import Upload from "./components/Upload.vue";
import Table from './components/Table.vue'
import Person from './components/Person.vue'
import router from '@/router'

export default {
  name: "App",
  components: {Upload,Table,Person},
  setup(){
    console.log(router)
    return {router}
  }
};
</script>

<style scoped></style>
