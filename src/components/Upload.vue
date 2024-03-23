<template>
  <form @submit.prevent="submitForm">
    <select v-model="formData.fileType">
      <option value="1">输入</option>
      <option value="2">输出</option>
    </select>
    <input type="file" ref="fileInputRef" @change="handleFileChange" />
    <button type="submit">提交</button>
  </form>
  <div class="table" style="margin-top: 120px">
    <h3>列表</h3>
    <el-table :data="tableData" style="width: 100%" #default="scope">
      <el-table-column prop="fileName" label="文件名" width="120" />
      <el-table-column prop="fileType" label="文件类型" width="120" />
      <el-table-column prop="createTime" label="上传时间" width="120" />
      <el-table-column label="操作" width="300">
        <template #default>
          <el-button link type="primary" size="small" @click="handleStart"
            >启动</el-button
          >
          <el-select
            placeholder="方案"
            size="small"
            style="width: 70px"
          >
            <el-option
              v-for="item in scope.row"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-button link type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-model:page-size="changePage.size"
      v-model:current-page="changePage.current"
      :page-sizes="[10, 25, 50]"
      layout="sizes,prev, pager, next"
      v-model:total="changePage.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts" name="Upload">
import { ref, reactive, onMounted } from "vue";
import { ElTable, ElTableColumn, ElSelect, ElOption } from 'element-plus';
import axios from "axios";
interface FormData {
  fileType: 1 | 2; // 1: 输入, 2: 输出
  file: File | null;
}

const formData = ref<FormData>({
  fileType: 1,
  file: null,
});

const fileInputRef = ref<HTMLInputElement | null>(null);

const submitForm = () => {
  const formDataToSend = new FormData();
  formDataToSend.append("fileType", formData.value.fileType + "");
  if (formData.value.file) {
    formDataToSend.append("file", formData.value.file);
  }
  // 提交上传的数据
  axios
    .post("http://localhost:8080/vwHubInput/upload", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      alert("新增成功");
      loadTable()
    })
    .catch((error) => {
      console.log(error);
      // 处理错误响应
    });
};

const handleFileChange = () => {
  const files = fileInputRef.value?.files;
  if (files && files.length) {
    formData.value.file = files[0];
  }
};

const changePage = reactive({
  current: 1, //默认当前页面为1
  total: 1, //总共有多少数据
  size: 10,
});

let tableData = reactive([])

const loadTable = () => {
  const params = {
    current: changePage.current,
    size: changePage.size,
  };
  axios
    .get("http://localhost:8080/vwHubInput/page", { params })
    .then((data) => {
      const resData = data.data.data;
      tableData = resData.records
      changePage.current = resData.current;
      changePage.size = resData.size;
      changePage.total = resData.total;
      // 处理成功响应
    })
    .catch((error) => {
      console.log(error);
      // 处理错误响应
    });
};

const handleCurrentChange = (newPage) => {
  changePage.current = newPage;
  loadTable();
};

const handleSizeChange = (newSize) => {
  changePage.size = newSize;
  loadTable();
};

onMounted(loadTable);
</script>
<style>
.upload {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
button {
  margin: 0 10px;
  font-size: 10px;
}
</style>
