import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/smartCangZhouDocument/', // 仓库名
  title: "smartCangZhouDoc",
  description: "smartcangzhou miniprogram's interface docuoment",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/onlineApp' }
    ],
    sidebar: [
      {
        text: '示例',
        items: [
          { text: '上线应用', link: '/onlineApp' },
          { text: '获取用户信息', link: '/getUserInfo' },
          { text: '智慧沧州人脸识别', link: '/authFace' },
          { text: '公众号跳转智慧沧州', link: '/h5ToMiniProgram' },
          { text: '扫码跳转智慧沧州进入h5', link: '/scanToMiniProgram' },
          { text: '第三方应用打开文件', link: '/openFile' },
          { text: '体验版本测试', link: '/onlineTest' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  publicDir: './public'
})
