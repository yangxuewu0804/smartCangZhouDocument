
<template>
	<pre><code class="language-javascript">{{ props.code }}</code></pre>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // 选择一个主题样式文件

const props = defineProps(['code'])
onMounted(() => {
	Prism.highlightAll(); // 确保在 DOM 更新后调用此方法
})
</script>
<style>

</style>
