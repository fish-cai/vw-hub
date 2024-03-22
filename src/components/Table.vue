<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="fileName" label="文件名" width="120" />
    <el-table-column prop="fileType" label="文件类型" width="120" />
    <el-table-column prop="createTime" label="上传时间" width="120" />
    <el-table-column label="操作" width="300">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
          >启动</el-button>
        <el-select
          v-model="value"
          placeholder="Select"
          size="small"
          style="width: 70px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-button link type="primary" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  
  <script lang="ts" setup name="Table">
const handleClick = () => {
  console.log("click");
};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
];
</script>
  