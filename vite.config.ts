import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  // Components({
  //   resolvers: [ElementPlusResolver()],
  // }),
  // css:{
  //   loaderOptions:{
      
  //   }
  // },
],

  resolve: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      api: resolve('src/api'),
      view: resolve('src/view'),
      utils: resolve('src/utils'),
      routes: resolve('src/routes'),
      styles: resolve('src/styles')
    }
  },
  server: {
    host: '',
    //端口号
    port: 4300,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
    open: false,
    //自定义代理规则
    proxy: {
      // 选项写法
      '/api': {
        target: 'https://netease-cloud-music-api-eight-zeta.vercel.app/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
