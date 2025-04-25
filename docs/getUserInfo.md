# 获取用户信息

此文档是第三方应用获取智慧沧州的用户信息的流程介绍。

用户点击应用图标，微信小程序webview在url中携带参数跳转第三方应用，然后使用该参数请求智慧沧州服务端获取到用户信息。

## 调用流程如下：

**1.在用户打开应用URL时，小程序端会生产一个code（有效期5分钟），并将该code附加在url参数中，参数名称为”code”。例如：https://baidu.com?code=MHqiJD4aw7wVZ1TC** 

```
 url地址：https://h5.com?code=''&appKey=''
 code: 获取用户信息的凭证
 appkey: 应用appKey，如果多个应用采用同一个域名可通过appkey区分应用。
```

**2.应用H5端通过读取url参数获取code值，还需携带应用的app_key、secret_key（app_key、secret_key由智慧沧州管理员提供。其中secret_key应妥善保存，不要泄露也不要遗失。如果遗失将无法找回，只能由智慧沧州管理员重置）,然后传递给应用服务端。核验成功后将返回加密后的用户信息（加密秘钥由智慧沧州管理员提供)**
<script setup>
</script>
<Auth tip="请求地址">
<div style="background-color: #f49623">
请求地址：【POST】https://api.smartcangzhou.cn:19091/appApi/userInfo
</div>

</Auth>


请求参数

```
{
	"app_key": "{{ak}}",
	"secret_key": "{{sk}}",
	"code": "{{code}}"
}
```

**3.应用服务端使用秘钥解开密文，获得用户信息。**

解密方式： 加密算法为国密SM4对称加密算法。接口返回数据是密文的Base64编码字符串，开发者应先将密文转换为byte数组，然后通过秘钥解密出原文字符串。 如果是用JAVA语言开发，可以使用Hutool工具包的SM4工具获取原文字符串，示例代码如下：

```
// 秘钥的16进制字符串(联系数产公司技术创新部获取)
String encryptKey = "52965b4a212155f207f908ff4ed56487";
// 密文字符串(对应接口返回值JSON中的"data"字段值)
String data = "L08aXkkX8mVo79NsNPwz7fURshrE+RGtf+UsfebPCUSTNlHI+1qr9yA0LUkghjRyf0SpI+e0y6tbKGezV6QywOoNYzl8+zcNWEACQFAfU3CkLnOyfc5wxGTJWw4GWFiUcXeCR0zn6eFla4xRzXdDoA==";
// 使用Hutool工具包中的SM4工具获取原文字符串
String decryptedStr = SmUtil.sm4(HexUtil.decodeHex(encryptKey)).decryptStr(data);
// 获取到的原文字符串为json格式
System.out.println(decryptedStr);
```

原文字符串格式： Json类型，格式为：

```
{
    "openid": "yuanshenqidong666", // 	用户的微信openid	
    "name": "钟离", // 		用户姓名	
    "idCardNumber": "111222199911118888", // 用户身份证号(字母小写)
    "phoneNumber": "19912345678" // 用户手机号
}
```

| 错误码  | 意义           |
| ---- | ------------ |
| 1008 | 缺少参数         |
| 1900 | app_key无效    |
| 1901 | secret_key无效 |
| 1902 | code无效       |

### 响应示例

•成功(200)

```
{
"data": "L08aXkkX8mVo79NsNPwz7fURshrE+RGtf+UsfebPCUSTNlHI+1qr9yA0LUkghjRyf0SpI+e0y6tbKGezV6QywOoNYzl8+zcNWEACQFAfU3CkLnOyfc5wxGTJWw4GWFiUcXeCR0zn6eFla4xRzXdDoA==" //加密后的用户信息
}
```

•失败(200)

```
{
"errorCode": 1902,// 错误码
"errorMessage": "code无效" //错误提示
}
```
::: warning

•用户信息包括4项：微信openid、姓名、身份证号、手机号。接口会根据应用的用户信息要求配置返回相应信息，例如，应用配置了“需要获取用户openid”，则提供的用户信息会包括需要获取用户openid。未配置的信息项则不会提供。

•code有效期为五分钟且只能使用一次。过期或已使用会提示code无效。

•秘钥为应用注册时系统自动生成，请妥善保存不要泄露给他人。如果遗失或泄露，请立即联系数产公司技术创新部处理。
:::

