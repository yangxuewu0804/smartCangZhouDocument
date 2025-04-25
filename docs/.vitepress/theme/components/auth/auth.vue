<template>
	<div class="container">
		<div class="container__item">
			<form class="form" @submit.prevent="submit">
				<input type="password" v-model="password" class="form__field" :placeholder="'请输入密码查看' + (tip || '')" />
				<button type="button" class="btn btn--primary btn--inside uppercase" @click="submit">查看</button>
			</form>
		</div>
		<div v-show="authResult" class="content"  :class="['content',{'slideInRight': !showAnimation}]">
			<slot></slot>
		</div>
		<div v-if="authResult === false" :class="['content', {'content-animation': showAnimation}]">密码错误请重试</div>
	</div>

</template>
<script setup>
import {ref, defineProps} from 'vue'

const authResult = ref('')
const password = ref('')
const showAnimation = ref(false)

const props = defineProps(['tip'])
function submit() {
	getHash(password.value).then(hash => {
		if(hash === 'c76a73e02048522e76f4f1413cb1dcb599e439e787047d334e40172882541e64') {
			authResult.value = true
		} else {
			authResult.value = false
			showAnimation.value = true
			setTimeout(() => {
				showAnimation.value = false
			}, 820) // 动画持续时间 + 一点缓冲时间
		}
	});
}
async function getHash(str) {
	const msgUint8 = new TextEncoder().encode(str); // 将字符串转换为Uint8Array
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // 生成SHA-256哈希值
	const hashArray = Array.from(new Uint8Array(hashBuffer)); // 将Buffer转换为Uint8Array，然后转换为数字数组
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // 将每个字节转换为十六进制并连接起来
	return hashHex;
}

</script>
<style scoped>
.content{
	margin-top: 20px;
	width: 100%;
}
.content-animation {
	animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	color: red;
}
.slideInRight {
	animation: slideInRight 0.5s ease-in-out both;
}
@keyframes shake {
	10%, 90% {
		transform: translateY(-1px);
	}

	20%, 80% {
		transform: translateY(2px);
	}

	30%, 50%, 70% {
		transform: translateY(-4px);
	}

	40%, 60% {
		transform: translateY(4px);
	}
}

@keyframes slideInRight {
	0% {
		transform: translateX(100%);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}
:root {
	background: #f5f6fa;
	color: #9c9c9c;
	font: 1rem "PT Sans", sans-serif;
}

html,
body,
.container {
	height: 100%;
}

a {
	color: inherit;
}
a:hover {
	color: #7f8ff4;
}

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.uppercase {
	text-transform: uppercase;
}

.btn {
	display: inline-block;
	background: transparent;
	color: inherit;
	font: inherit;
	border: 0;
	outline: 0;
	padding: 0;
	transition: all 200ms ease-in;
	cursor: pointer;
}
.btn--primary {
	background: #7f8ff4;
	color: #fff;
	box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
	border-radius: 2px;
	padding: 12px 36px;
}
.btn--primary:hover {
	background: #6c7ff2;
}
.btn--primary:active {
	background: #7f8ff4;
	box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
}
.btn--inside {
	margin-left: -96px;
}

.form__field {
	width: 360px;
	background: #fff;
	color: #a3a3a3;
	font: inherit;
	box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
	border: 0;
	outline: 0;
	padding: 22px 18px;
}
</style>
