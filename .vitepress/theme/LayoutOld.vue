<template>
  <div class="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
    <component v-bind:is="getComponent()"></component>
  </div>
</template>

<script>
import Home from './Home.vue'
import Blog from './Blog.vue'
import BlogLayout from './BlogLayout.vue'
import Article from './Article.vue'
import PageLayout from './PageLayout.vue'
import { useRoute, useData } from 'vitepress'
import { ref, watch, computed } from 'vue'
//const route = useRoute()
//const { site, page, theme, frontmatter } = useData()

export default {
  components: { Home, Blog, BlogLayout, PageLayout, Article },
  setup() {
    //const { site, page, theme } = useData();
    const route = useRoute()
    return {
      isIndex: computed(() => {
        console.log(`Layout: route.path=${route.path}, rel: ${route.data.relativePath}`)
        return route.data.relativePath === 'index.md'
      }),
      getComponent: () => {
        if (route.path === '/') {
          return 'Home'
        } else if (route.path === '/blog/' || route.path === '/blog.html') {
          return 'Blog'
        } else if (route.path.startsWith('/blog/')) {
          return 'BlogLayout'
        } else {
          return 'PageLayout'
        }
      },
    }
  },
}
</script>
