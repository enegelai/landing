<script setup>
import Date from './Date.vue'
import Author from './Author.vue'
import PageHeader from './PageHeader.vue'
import TableOfContent from './TableOfContent.vue'
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from '../posts.data'

const { frontmatter: data } = useData()

const route = useRoute()

function findCurrentIndex() {
  return posts.findIndex((p) => p.href === route.path)
}

// use the customData date which contains pre-resolved date info
const date = computed(() => posts[findCurrentIndex()].date)
const nextPost = computed(() => posts[findCurrentIndex() - 1])
const prevPost = computed(() => posts[findCurrentIndex() + 1])
</script>

<template>
  <div class="antialiased">
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
    <div class="">
      <div class="max-w-8xl mx-auto">
        <div class="flex px-4 pt-8 pb-10 lg:px-8">
          <a class="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white" href="/blog">
            <svg viewBox="0 -9 3 24" class="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300">
              <path d="M3 0L0 3L3 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            Go back</a
          >
        </div>
      </div>
      <div class="px-4 sm:px-6 md:px-8 flex justify-center">
        <!-- <div class="max-w-3xl lg:mx-auto pb-28"> -->
        <div class="max-w-4xl pb-28">
          <main>
            <div class="w-full mx-auto max-w-8xl lg:flex">
              <div class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible overflow-hidden max-h-screen fixed">
                <div class="w-full flex">
                  <article class="relative pt-10">
                    <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl">
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
                    </div>
                    <Content class="mt-12 prose prose-slate dark:prose-dark" />
                  </article>
                </div>
              </div>
            </div>
            <!--<div class="flex">
                <Content class="mt-12 prose prose-slate dark:prose-dark" />
                <TableOfContent :anchors="[]" />
              </div>-->
          </main>
        </div>
        <!--<TableOfContent :anchors="anchors" />-->
        <TableOfContent v-if="true" :anchors="anchors" />
      </div>
    </div>
  </div>
  <!--<div class="antialiased">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <nav class="flex justify-between items-center py-10 font-bold">NAV GOES HERE</nav>
    </div>
    <div class="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none"><div class="w-[108rem] flex-none flex justify-end"><picture><source srcset="/_next/static/media/docs@30.8b9a76a2.avif" type="image/avif"><img src="/_next/static/media/docs@tinypng.d9e4dcdc.png" alt="" class="w-[71.75rem] flex-none max-w-none dark:hidden" decoding="async"></picture><picture><source srcset="/_next/static/media/docs-dark@30.1a9f8cbf.avif" type="image/avif"><img src="/_next/static/media/docs-dark@tinypng.1bbe175e.png" alt="" class="w-[90rem] flex-none max-w-none hidden dark:block" decoding="async"></picture></div></div>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <article class="xl:divide-y xl:divide-gray-200">
        <header class="pt-6 xl:pb-10 space-y-1 text-center">
          <Date :date="date" />
          <h1 class="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {{ data.title }}
          </h1>
        </header>

        <div class="divide-y xl:divide-y-0 divide-gray-200 xl:grid xl:grid-cols-4 xl:gap-x-10 pb-16 xl:pb-20" style="grid-template-rows: auto 1fr">
          <Author />
          <div class="divide-y divide-gray-200 xl:pb-0 xl:col-span-3 xl:row-span-2">
            <Content class="prose max-w-none pt-10 pb-8" />
          </div>

          <footer class="text-sm font-medium leading-5 divide-y divide-gray-200 xl:col-start-1 xl:row-start-2">
            <div v-if="nextPost" class="py-8">
              <h2 class="text-xs tracking-wide uppercase text-gray-500">Next Article</h2>
              <div class="link">
                <a :href="nextPost.href">{{ nextPost.title }}</a>
              </div>
            </div>
            <div v-if="prevPost" class="py-8">
              <h2 class="text-xs tracking-wide uppercase text-gray-500">Previous Article</h2>
              <div class="link">
                <a :href="prevPost.href">{{ prevPost.title }}</a>
              </div>
            </div>
            <div class="pt-8">
              <a class="link" href="/">← Back to the blog</a>
            </div>
          </footer>
        </div>
      </article>
    </main>
  </div>-->
</template>
