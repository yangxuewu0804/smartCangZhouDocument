# 上线应用

## 提供应用图标和网址

第三方应用需向智慧沧州小程序提供应用名称、应用图标、应用URL以及应用需要从智慧沧州获取的信息（openid、身份证号和姓名、手机号，其中openid和身份信息只能选择一项）。图标风格大小为200*200，颜色不限制。
信息提供给智慧沧州管理员后，会获得包含ak、sk、encrypt_key、redirect_id信息的文件，用于后续调用智慧沧州其他接口。

## 配置校验文件
上线应用需要第三方在提供的应用URL的域名服务器中配置微信小程序校验文件，具体请参考[微信小程序域名校验文件](https://developers.weixin.qq.com/community/develop/doc/0000a423770ed0c6d80323d6c6b009?%2Fblogdetail%3Faction=get_post_info)。

<Auth tip="智慧沧州校验文件">
    <FileDownLoad content="U2FsdGVkX19d5viWqsY6BScKldVaChRSsuz3XrQKPcO1MvQH2MIMIIoSs8ejbfz4OCu0DndBnuyOEGGWnRMJNQ==" filename="fsyVaVww3x.txt"></FileDownLoad>
</Auth>

::: tip
openid和身份证号都是唯一索引，为防止应用误使用，openid和身份证号不能同时获取，特殊情况请联系智慧沧州小程序管理员。
:::

