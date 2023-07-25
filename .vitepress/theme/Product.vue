<script setup>
import PageHeader from './PageHeader.vue'

import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/vue/20/solid'
  
  const features = [
    {
      name: 'Call Summarization',
      description:
        'Forget about tedious manual transcription and analysis. Our Conversation Intelligence Dashboard delivers concise and accurate call summaries at the click of a button. Understand the crux of each interaction without sifting through lengthy transcripts, saving you time and improving productivity.',
      href: '#',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'KPI Calculation',
      description:
        "Effectively monitor your team's performance with automatic KPI calculations. Our intelligent dashboard evaluates each call based on critical metrics, assigns ratings, and offers actionable insights for improvement. Easily track the most important KPIs such as Net Promoter Score, Accuracy of Responses, Relevance of Responses, among others.",
      href: '#',
      icon: LockClosedIcon,
    },
    {
      name: 'Detection of Strengths and Weaknesses',
      description:
        "Gain an in-depth understanding of your agents' communication skills. Our product utilizes advanced AI algorithms to identify the strengths and weaknesses exhibited by agents during their conversations. These insights can guide personalized training and development, leading to enhanced agent proficiency and improved customer satisfaction.",
      href: '#',
      icon: ArrowPathIcon,
    },
  ]
</script>

<template>
    <PageHeader></PageHeader>
    <div class="bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-400">Empower your agents</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Conversation Intelligence Dashboard</p>
          <p class="mt-6 text-lg leading-8 text-gray-300">a cutting-edge solution designed to streamline call center operations and enhance agent performance. Leveraging the power of AI, the Conversation Intelligence Dashboard simplifies call summarization, facilitates KPI calculation, and identifies agent strengths and weaknesses based on conversation transcripts.</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div v-for="feature in features" :key="feature.name" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <component :is="feature.icon" class="h-5 w-5 flex-none text-indigo-400" aria-hidden="true" />
                {{ feature.name }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p class="flex-auto">{{ feature.description }}</p>
                <p class="mt-6">
                  <a :href="feature.href" class="text-sm font-semibold leading-6 text-indigo-400">Learn more <span aria-hidden="true">→</span></a>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </template>
  
