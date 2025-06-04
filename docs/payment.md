# 跳转支付页面

此文档是第三方应用进行支付的流程介绍。进行开发前请先行联系智慧沧州管理员确认方案。

第三方应用在自己的服务端进行下单，然后携带预支付订单等信息跳转到智慧沧州支付页面进行支付。

## 调用流程如下：
请根据业务自行修改，以下代码仅为小程序和网页通信示例。
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
    // 请对参数进行encodeURLComponent编码后，加入到地址中
   var url = "/pages/openPage/payment/payment?prepayId=12&paySign=12&timeStamp=23&nonceStr=12&otherParams=12";
  jumpToMiniProgramPage(url)
      .then(({ errorCode, message, data }) => {
        // errorCode: -1 ,参数传错了
        // errorCode: 0 ,支付成功
        // errorCode:1, 支付取消
        // errorCode:2, 支付错误
        // errorCode:3, 用户主动返回（未点击立即支付）
        // data: 传给小程序的不必要参数{otherParams:12}
        alert(\`获取成功: \${JSON.stringify(data)}\` + message);
        //书写代码逻辑位置
      })
      .catch(({ errorCode, message, data }) => {
        alert(\`获取失败: \${message}\` + msg);
      });
}
`
</script>
<CodeDisplay :code="codeString"></CodeDisplay>
