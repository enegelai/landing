<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import Home from './Home.vue'
//import Article from './Article.vue'
import NotFound from './NotFound.vue'
import Blog from './Blog.vue'
import Product from './Product.vue'
import BusinessCase from './BusinessCase.vue'
import BlogLayout from './BlogLayout.vue'
import PageLayout from './PageLayout.vue'
import About from './About.vue'

const route = useRoute()
const isIndex = computed(() => route.path.replace(/index.html$/, '') === '/')
// const isNotFound = computed(() => route.component === NotFound)
const isBlogHome = computed(() => route.path === '/blog/' || route.path === '/blog.html')
const isBlogPage = computed(() => route.path.startsWith('/blog/'))
const isProductPage = computed(() => route.path.endsWith('product/'))
const isBusinessCasePage = computed(() => route.path.endsWith('businesscase/'))
const isAbout = computed(() => route.path.endsWith('about/'))
</script>

<template>
  <div class="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
    <Home v-if="isIndex" />
    <NotFound v-else-if="isNotFound" />
    <Blog v-else-if="isBlogHome" />
    <BlogLayout v-else-if="isBlogPage" />
    <Product v-else-if="isProductPage" />
    <BusinessCase v-else-if="isBusinessCasePage" />
    <About v-else-if="isAbout" />
    <PageLayout v-else />
  </div>
</template>
