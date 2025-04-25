# 扫码跳转智慧沧州进入h5

根据二维码参数，智慧沧州小程序会根据redirect字段确认跳转目标h5，然后携带参数跳转到h5。

## 二维码内容:
http://qr.smartcangzhou.cn?redirect=[redirect_id]&param1=''&param2=''
##### 参数说明

必填参数：redirect（上线应用时智慧沧州管理员提供的文件中存在）

其他参数：不占用redirect、code、appKey字段名即可，会透传参数给H5
##  跳转到h5时的地址：
https://H5域名?code=''&appKey=''&param1=''&param2=''
##### 参数说明
code：用户信息接口需要传递的code内容

appKey：用户信息接口需要传递的appKey内容

其他参数：不占用redirect、code、appKey字段名即可，会透传参数给H5

