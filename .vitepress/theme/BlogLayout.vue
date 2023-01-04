<template>
  <PageHeader></PageHeader>
  <div class="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
    <div class="w-[108rem] flex-none flex justify-end">
      <picture
        ><!--<source srcset="/media/docs@30.8b9a76a2.avif" type="image/avif" />-->
        <img src="/media/docs@tinypng.d9e4dcdc.png" alt="" class="w-[71.75rem] flex-none max-w-none dark:hidden" decoding="async" /></picture
      ><picture
        ><!--<source srcset="/media/docs-dark@30.1a9f8cbf.avif" type="image/avif" />-->
        <img src="/media/docs-dark@tinypng.1bbe175e.png" alt="" class="w-[90rem] flex-none max-w-none hidden dark:block" decoding="async"
      /></picture>
    </div>
  </div>

  <button type="button" @click="navOpen = !navOpen" class="fixed z-50 bottom-4 right-4 w-16 h-16 rounded-full bg-gray-900 text-white block lg:hidden">
    <span class="sr-only">Open site navigation</span>
    <IconNavOpen :class="{ 'opacity-0 scale-75': !navOpen }" class="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform" />
    <IconNavClose :class="{ 'opacity-0 scale-75': navOpen }" class="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform" />
  </button>

  <div class="w-full mx-auto max-w-8xl lg:flex">
    <BlogSideBar :nav-open="navOpen" @update:closeNav="navOpen = false" />
    <div class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible" :class="{ 'overflow-hidden max-h-screen fixed': navOpen }">
      <div class="w-full flex">
        <!--<ContentWrapper @contentUpdated="handleContentUpdate" />-->
        <!--<Content class="prose"></Content>-->
        <article class="relative">
          <!--<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl">
            {{ data.title }}
          </h1>
          <div class="text-sm leading-6">
            <dl>
              <dt class="sr-only">Date</dt>
              <dd class="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
                <Date :date="date" />
              </dd>
            </dl>
          </div>
          <div class="mt-6">
            <Author />
          </div>-->
          <!--<Content class="mt-12 prose prose-slate dark:prose-dark" />-->
          <!--<div class="text-sm leading-6">
            <dl>
              <dt class="sr-only">Date</dt>
              <dd class="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
                <Date :date="date" />
              </dd>
            </dl>
          </div>-->
          <BlogContent @contentUpdated="handleContentUpdate" />
        </article>
        <TableOfContent :anchors="anchors" />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue'
import BlogSideBar from './BlogSideBar.vue'
import BlogContent from './BlogContent.vue'
import TableOfContent from './TableOfContent.vue'
import ContentWrapper from './ContentWrapper.vue'
import IconNavOpen from './icons/IconNavOpen.vue'
import IconNavClose from './icons/IconNavClose.vue'
import { ref, watch, computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from '../posts.data'

function findCurrentIndex() {
  return posts.findIndex((p) => p.href === route.path)
}

export default {
  data() {
    return {
      anchors: null,
      navOpen: false,
    }
  },
  components: {
    PageHeader,
    BlogSideBar,
    BlogContent,
    TableOfContent,
    ContentWrapper,
    IconNavOpen,
    IconNavClose,
  },
  setup() {
    const { site, page, theme, frontmatter: data } = useData()
    const route = useRoute()
    //const currentRoute = ref();
    return {
      theme,
      page,
      data: data,
      route: route,
      collections: computed(() => theme.value.collections),
      pages: computed(() => theme.value.pages),
      date: computed(() => posts[posts.findIndex((p) => p.href === route.path)].date),
    }
  },
  mounted() {
    this.getAnchors()
  },
  methods: {
    handleContentUpdate() {
      this.getAnchors()
    },
    getAnchors() {
      this.anchors = Array.prototype.slice
        .call(document.querySelectorAll('.header-anchor'))
        .map((item) => {
          return { hash: item.hash, offsetTop: item.offsetTop }
        })
        .filter((item) => {
          // Only need the ones exist in TOC
          return this.page.headers.some((header) => '#' + header.slug === item.hash)
        })
    },
  },
}
</script>

<style>
a.header-anchor {
  @apply float-left opacity-0 no-underline text-gray-400;
  margin-top: 0.125em;
  margin-left: -0.87em;
  padding-right: 0.23em;
  font-size: 0.85em;
}

h1:hover .header-anchor,
h1:focus .header-anchor,
h2:hover .header-anchor,
h2:focus .header-anchor,
h3:hover .header-anchor,
h3:focus .header-anchor,
h4:hover .header-anchor,
h4:focus .header-anchor,
h5:hover .header-anchor,
h5:focus .header-anchor,
h6:hover .header-anchor,
h6:focus .header-anchor {
  opacity: 1;
}

*,
:after,
:before {
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
}
</style>
