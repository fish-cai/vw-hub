<template>
  <form @submit.prevent="submitForm">
    <select v-model="formData.fileType">
      <option value=1>输入</option>
      <option value=2>输出</option>
    </select>
    <input type="file" ref="fileInputRef" @change="handleFileChange" />
    <button type="submit">提交</button>
  </form>
</template>

<script setup lang="ts" name="Upload">
import { ref } from 'vue';
import axios from 'axios';

interface FormData {
  fileType: 1 | 2; // 1: 输入, 2: 输出
  file: File | null;
}

const formData = ref<FormData>({
  fileType: 1,
  file: null
});

const fileInputRef = ref<HTMLInputElement | null>(null);

const submitForm = () => {
  const formDataToSend = new FormData();
  formDataToSend.append('fileType', formData.value.fileType+"");
  if (formData.value.file) {
    formDataToSend.append('file', formData.value.file);
  }
  // 发送 formDataToSend 到后端接口
  axios.post('http://localhost:8080/vwHubInput/upload', formDataToSend,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      console.log(response)
      // 处理成功响应
    })
    .catch(error => {
      console.log(error)
      // 处理错误响应
    });
};

const handleFileChange = () => {
  const files = fileInputRef.value?.files;
  if (files && files.length) {
    formData.value.file = files[0];
  }
};
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