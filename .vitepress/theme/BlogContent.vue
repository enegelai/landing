<template>
  <div class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
    <div class="text-sm leading-6 mb-6">
      <dl>
        <dt class="sr-only">Date</dt>
        <dd class="text-slate-700 dark:text-slate-400">
          <Date :date="date" />
        </dd>
      </dl>
    </div>
    <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl">
      {{ page.title }}
    </h1>
    <div class="mt-6">
      <Author />
    </div>
    <!--<Content class="mt-12 prose prose-slate dark:prose-dark" />-->
    <!--<div class="text-sm leading-6">
      <dl>
        <dt class="sr-only">Date</dt>
        <dd class="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
          <Date :date="date" />
        </dd>
      </dl>
    </div>-->
    <!--
    <div class="pb-10 border-b border-gray-200 mb-10">
      <h1 class="inline-block text-3xl font-extrabold text-gray-900 tracking-tight">
        {{ page.title }}
      </h1>
      <p class="mt-1 text-lg text-gray-500">{{ page.description }}</p>
    </div>-->

    <Content class="prose prose-slate dark:prose-dark" />
  </div>
</template>

<script>
import Date from './Date.vue'
import Author from './Author.vue'
import { getNameFromPath, formatDate } from './utils.js'
import { ref, watch, computed } from 'vue'
import { useData } from 'vitepress'

export default {
  data() {
    return {
      flatPages: null,
      prevPage: null,
      nextPage: null,
    }
  },
  components: { Date, Author },
  emits: ['contentUpdated'],
  setup() {
    const { site, page, theme, frontmatter } = useData()
    //const currentRoute = ref();
    //console.log(`BlogContent: page:\n${JSON.stringify(page)}`)
    return {
      theme,
      page,
      frontmatter,
      collections: computed(() => theme.value.collections),
      pages: computed(() => theme.value.pages),
      date: computed(() => formatDate(frontmatter.value.date)),
    }
  },
  updated() {
    this.$emit('contentUpdated')
    this.getPrevNextPage()
  },
  mounted() {
    this.flatPages = Object.values(this.collections)
      .map((item) => Object.values(item))
      .flat()
    this.getPrevNextPage()
  },
  methods: {
    getPrevNextPage() {
      const pageIndex = this.flatPages.indexOf(getNameFromPath(this.page.relativePath))

      const prevPageID = pageIndex > 0 ? this.flatPages[pageIndex - 1] : null
      const nextPageID = pageIndex < this.flatPages.length - 1 ? this.flatPages[pageIndex + 1] : null

      this.prevPage = this.pages[prevPageID]
      this.nextPage = this.pages[nextPageID]
    },
  },
  computed: {
    buildEditURL() {
      return '' //this.$themeConfig.repo + '/edit/main/' + this.$page.relativePath
    },
  },
}
</script>
