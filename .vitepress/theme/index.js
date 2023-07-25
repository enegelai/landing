import './tailwind.css'
import './prism.css'
import './beams.css'
import './fonts.css'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
//import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
//const mdiVue = () => import('mdi-vue/v3')

import Blog from './Blog.vue'
import Product from './Product.vue'
//import DefaultTheme from 'vitepress/theme'

export default {
  Layout: Layout,
  NotFound: NotFound,
  enhanceApp(ctx) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData` is a `ref` of current site-level metadata.
    //router.addRoutes({ path: '/blog', component: Blog })

    //ctx.app.use(mdiVue, {
    //  icons: mdijs,
    //})

    console.log(`enhanceApp is called`)
  },
}
