# 调用智慧沧州人脸核身功能

此文档是第三方应用调用智慧沧州人脸核身功能的流程介绍。

h5携带参数跳转微信小程序指定界面，用户在该界面完成人脸核身后，该页面会返回给第三方应用参数，第三方应用拿到参数后，调用智慧沧州api获得最终检验结果。

## 前端示例代码

<script setup>
const codeString = `
// template
<div>
  <button @click="handleClick">跳转小程序</button>
</div>

// script
import Qs from "qs";
import wx from "weixin-js-sdk";
function jumpToMiniProgramPage(url) {
  function getGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
    ) {
      var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  return new Promise((resolve, reject) => {
    var _uuid = getGUID();
    var { hash } = window.location;
    var href = location.href.split("#")[0];
    // 带给小程序页面的参数
    let defaultQuery = Qs.stringify({
      href,
      hash,
      uuid: _uuid,
    });
    // query参数连接符
    let joiner = url.indexOf("?") < 0 ? "?" : "&";
    // hashchange的监听事件
    var hashchangeFunc = (_) => {
      var { callback: result, uuid } = Qs.parse(location.hash.split("?")[1]);
      // 防止其他代码改变hash值影响到当前回调
      if (_uuid === uuid) {
        // 防止回调参数未取到
        try {
          result = decodeURIComponent(result);
          result = JSON.parse(result || "{}");
        } catch (e) {
          result = {};
        }
        var { errorCode, message, data } = result;
        // 前端人脸核身成功
        if (errorCode === 0) {
          resolve(result);
        // 其他微信返回的失败原因
        } else {
          reject(result);
        }
        // 由于小程序改变了页面的hash，需要返回
        history.back();
        // 移除当前hashchange的监听
        window.removeEventListener("hashchange", hashchangeFunc);
      }
    };
    alert(
        \`当前location.href值为: \${location.href}\\r\\n\\r\\n跳转地址: \${url}\${joiner}\${defaultQuery}\`
    );
    // 跳转到对应页面, webview->小程序的通讯智能通过跳转小程序页面并且带入参数的方式
    wx.miniProgram.navigateTo({
      url: \`\${url}\${joiner}\${defaultQuery}\`,
    });
    // 监听hash变更，由于小程序没有api去实现小程序->webview的通讯，只能通过改变页面的hash传递消息
    // 改变hash并不会导致webview刷新
    window.addEventListener("hashchange", hashchangeFunc);
  });
}

function handleClick() {
  var url = "/pages/openPage/realNameAuth/realNameAuth?name=姓名&idCardNumber=身份证号&otherParams=12";
  jumpToMiniProgramPage(url)
      .then(({ errorCode, message, data }) => {
        /*
        *   errorCode  0:成功，-1：用户直接返回未验证， 1：验证失败（包含设备不支持等因素）
        *   message: 错误提示
        *   data: 传给验证页面的其他参数（otherParams等参数）
        *   errorCode等于0时，data中存在verifyResult参数用于验证人脸核身结果
        */
        alert(\`获取成功: \${JSON.stringify(data)}\` + message);
        书写代码逻辑位置
      })
      .catch(({ errorCode, message, data }) => {
        alert(\`获取失败: \${message}\` + msg);
      });
}
`
</script>
<Auth tip="代码示例">
    <CodeDisplay :code="codeString"></CodeDisplay>
</Auth>

## API
<Auth tip="请求地址">
    <div style="background-color: #f49623">
    请求地址：【GET】https://api.smartcangzhou.cn:19091/appApi/faceVerify
    </div>
</Auth>

``` 
{
    app_key: "",   // 应用ak
    secret_key: "", // 应用sk
    name:"", // 需验证用户名
    id_card: "", // 需验证用户身份证号
    verify_result:"" // 前端传回的参数
}
```
### 响应示例

•成功(200)
```
{
"errorCode": 0 //错误码，0表示核验成功，1004校验失败
}
```

•失败(200)
```
{
"errorCode": 1004 //错误码，0表示核验成功，1004校验失败
}
```

:::tip
需要注意的是router-view标签，不用使用router.fullpath当做key。
:::

