import DefaultTheme from 'vitepress/theme'
import Auth from './components/auth/auth.vue'
import FileDownLoad from './components/fileDownload/fileDownload.vue'
import CodeDisplay from './components/codeDisplay/codeDisplay.vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // 注册全局组件
        app.component('Auth', Auth)
        app.component('FileDownLoad', FileDownLoad)
        app.component('CodeDisplay', CodeDisplay)
    }
}
