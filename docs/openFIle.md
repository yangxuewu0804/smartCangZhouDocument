# 打开文件

第三方应用需要打开文件，因为微信小程序兼容问题，android打开文件网址需要先行下载文件后打开本机文件。

## 示例代码
<script setup>
const codeString = ` 
import wx from "weixin-js-sdk";
function jump() {
    wx.miniProgram.navigateTo({
        url: \`/pages/openPage/filePage/filePage?fileUrl=\${encodeURIComponent('https://h5.com/20250327/20250327/ac80741c.pdf')}\`,
    });
}
`
</script>
<Auth tip="代码示例">
<CodeDisplay :code="codeString"></CodeDisplay>
</Auth>

