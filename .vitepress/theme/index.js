import './tailwind.css'
import './prism.css'
import './beams.css'
import './fonts.css'
import Layout from './Layout.vue'
import Blog from './Blog.vue'
//import DefaultTheme from 'vitepress/theme'

export default {
  Layout: Layout,
  NotFound: Layout, // TODO
  enhanceApp(ctx) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData` is a `ref` of current site-level metadata.
    //router.addRoutes({ path: '/blog', component: Blog })
    console.log(`enhanceApp is called`)
  },
}
