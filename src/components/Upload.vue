<template>
  <div>
    <el-form :inline="true" v-model="formData" label-width="auto" label-position="left">
      <el-form-item label="文件类型">
        <el-select v-model="formData.fileType" style="width: 200px">
          <el-option label="输入" value="1" key="1" />
          <el-option label="输出" value="2" key="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <label>上传文件</label>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="文件名"
          v-model="formData.modelFileName"
          disabled
          style="width: 200px"
        />
        <el-upload
          class="upload-demo"
          style="width: 50%"
          action="none"
          :show-file-list="false"
          drag
          :on-change="handleFileChange"
          :auto-upload="false"
          ref="fileInputRef"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">点击上传文件</div>
        </el-upload>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
    <div class="table" style="margin-top: 20px">
      <h3>列表</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="fileName" label="文件名" />
        <el-table-column prop="typeName" label="文件类型" />
        <el-table-column prop="createTime" label="上传时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              :loading="scope.row.startLoading"
              :disabled="scope.row.results.length > 0 ? true : false"
              v-if="scope.row.fileType == 1"
              link
              type="primary"
              size="small"
              @click="handleStart(scope)"
              >启动</el-button
            >
            <div v-if="scope.row.results.length > 0" style="display: inline">
              <el-select
                v-model="scope.row.resultId"
                placeholder="方案"
                size="small"
                style="width: 170px"
                @change="onResultIdChange(scope)"
              >
                <el-option
                  v-for="item in scope.row.results"
                  :key="item.id"
                  :label="item.outputFileName"
                  :value="item.id"
                />
              </el-select>
              <el-button link type="primary" size="small" @click="handleDownload(scope)"
                >下载</el-button
              >
              <el-button link type="primary" size="small" @click="handleView(scope)"
                >查看</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="changePage.size"
        :current-page="changePage.current"
        :page-sizes="[5, 10, 25, 50]"
        layout="sizes,prev, pager, next,total"
        :total="changePage.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="Upload" props>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { Eleme } from "@element-plus/icons-vue";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-drawer.css";
import { UploadFilled } from "@element-plus/icons-vue";
import { inject } from "vue";
import { fa, tr } from "element-plus/es/locale";

const baseUrl = inject("baseUrl");
interface FormData {
  fileType: "1" | "2"; // 1: 输入, 2: 输出
  file: File | null;
  modelFileName: String;
}

const formData = ref<FormData>({
  fileType: "1",
  file: null,
  modelFileName: "",
});

const fileInputRef = ref<HTMLInputElement | null>(null);

const submitForm = () => {
  const formDataToSend = new FormData();
  formDataToSend.append("fileType", formData.value.fileType + "");
  if (formData.value.file) {
    formDataToSend.append("file", formData.value.file);
  } else {
    ElMessage("请上传文件");
    return;
  }
  console.log("data", formData.value);
  // 提交上传的数据
  axios
    .post(baseUrl + "vwHubInput/upload", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      ElMessage("提交成功");
      loadTable();
    })
    .catch((error) => {
      ElMessage("提交失败");
      // 处理错误响应
    });
};

const handleFileChange = (file: any) => {
  console.log(file);
  formData.value.file = file.raw;
  formData.value.modelFileName = file.name;
};

const changePage = reactive({
  current: 1, //默认当前页面为1
  total: 1, //总共有多少数据
  size: 10,
});

//todo 这里用reactive 会导致table 数据跟分页错一页 为什么？
let tableData = ref([]);

const loadTable = () => {
  const params = {
    current: changePage.current,
    size: changePage.size,
  };
  axios
    .get(baseUrl + "vwHubInput/page", { params })
    .then((data) => {
      const resData = data.data.data;
      tableData.value = resData.records;
      tableData.value.map((item) => {
        item.startLoading = false;
        if (item.results.length > 0) {
          item.resultId = item.results[0].id;
        }
        console.log(item);
        return item;
      });
      changePage.current = resData.current;
      changePage.size = resData.size;
      changePage.total = resData.total;
      // 处理成功响应
    })
    .catch((error) => {
      ElMessage("列表查询失败");
      // 处理错误响应
    });
};

const handleCurrentChange = (newPage: any) => {
  changePage.current = newPage;
  loadTable();
};

const handleSizeChange = (newSize: any) => {
  changePage.size = newSize;
  loadTable();
};

const handleStart = (scope: any) => {
  const params = {
    id: scope.row.id,
  };
  scope.row.startLoading = true;
  axios
    .get(baseUrl + "vwHubInput/start", { params })
    .then((data) => {
      // 处理成功响应
      const res = data.data;
      if (res.code == 500) {
        ElMessage(res.message);
      } else {
        ElMessage("执行成功");
        loadTable();
      }
      scope.row.startLoading = false;
    })
    .catch((error) => {
      ElMessage("接口调用失败");
      scope.row.startLoading = false;
    });
};

const onResultIdChange = (scope: any) => {};

const props = defineProps(["router"]);
const handleView = (scope: any) => {
  const resultId = scope.row.resultId;
  if (resultId == undefined) {
    ElMessage("请先选择方案");
    return;
  }

  // router.push({name:'VwHubMap',params:params});
  // router.push('VwHubMap');
  //都不生效
  window.open("/#/VwHubMap?resultId=" + resultId);
};

const handleDownload = (scope: any) => {
  const resultId = scope.row.resultId;
  if (resultId == undefined) {
    ElMessage("请先选择方案");
    return;
  }

  const url = baseUrl + "/vwHubInput/downLoadOut?resultId=" + resultId;

  // 使用浏览器原生的下载功能
  window.open(url, "_blank");
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
.el-form-item {
  text-align: center;
}
</style>
