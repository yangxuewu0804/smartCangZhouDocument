<script setup>
import axios from 'axios'
import emitter from "../../../../../utils/mitt.js";
import {decryptString} from "../../../../../utils/encrypt.js";
import {onMounted, ref} from "vue";

const props = defineProps(['filename', 'url', 'content'])
// 保存密码
let password = ref('')
onMounted(() => {
	emitter.on('deliveryPassword', (value) => {
		password.value = value
	})
})
function getMimeType(filename) {
	const extension = filename.split('.').pop().toLowerCase();
	switch (extension) {
		case 'txt':
			return 'text/plain';
		case 'pdf':
			return 'application/pdf';
		case 'doc':
		case 'docx':
			return 'application/msword';
		case 'xls':
		case 'xlsx':
			return 'application/vnd.ms-excel';
		case 'ppt':
		case 'pptx':
			return 'application/vnd.ms-powerpoint';
		case 'jpg':
		case 'jpeg':
			return 'image/jpeg';
		case 'png':
			return 'image/png';
		case 'gif':
			return 'image/gif';
		case 'json':
			return 'application/json';
		case 'csv':
			return 'text/csv';
		case 'zip':
			return 'application/zip';
		case 'rar':
			return 'application/x-rar-compressed';
		default:
			return 'application/octet-stream'; // 默认二进制流
	}
}
function createText(filename, content) {
	console.log('filename', filename)
	console.log('content', content)
	let encryptPassword = decryptString(content, password.value)
	downFile(filename, encryptPassword)
}
function getFile(filename, fileUrl) {
	axios.get(fileUrl, { responseType: 'arraybuffer' })
		.then(response => {
			downFile(filename,response.data)
		})
		.catch(error => {
			// 处理错误
			console.error(error);
		});
}
function downFile(filename, content) {
	// 获取文件的 MIME 类型
	const mimeType = getMimeType(filename);
	// 创建一个 Blob 对象
	const blob = new Blob([content], { type: mimeType });
	// 创建一个 URL 对象
	const url = window.URL.createObjectURL(blob);
	// 创建一个隐藏的 <a> 元素
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	// 将 <a> 元素添加到 DOM 中
	document.body.appendChild(a);
	// 触发点击事件
	a.click();
	// 移除 <a> 元素
	document.body.removeChild(a);
	// 释放 URL 对象
	window.URL.revokeObjectURL(url);
}
</script>

<template>
	<div>
		<button style="color: #3351B2;font-weight: bolder" @click="() => props.url ? getFile(props.filename, props.url ):createText(props.filename, props.content)">点击下载</button>
	</div>
</template>

<style scoped>
</style>
