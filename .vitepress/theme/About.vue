<template>
    <PageHeader></PageHeader>
    <div class="bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our team</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">We’re a dynamic group of contact center professionals with decades of experience who are passionate about what we do and dedicated to delivering the best results for our clients.</p>
        </div>
        <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          <li v-for="person in people" :key="person.name">
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" :src="person.imageUrl" alt="" />
            <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{{ person.name }}</h3>
            <p class="text-base leading-7 text-gray-300">{{ person.role }}</p>
            <p class="text-sm leading-6 text-gray-500">{{ person.location }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
<script setup>
  import PageHeader from './PageHeader.vue'

  const people = [
    {
      name: 'Slava Zhakov',
      role: 'Founder / CEO',
      imageUrl:
        '../img/Slava Pic 6.png',
      location: 'Former Genesys CTO',
    },
    {
      name: 'Slava Sayko',
      role: 'Founder / CTO',
      imageUrl:
        '../img/Slava Sayko Pic.png',
      location: 'Former Genesys SVP of R&D',    
    },
    {
      name: 'Luke Derrin',
      role: 'CMO',
      imageUrl:
        '../img/Luke Derrin Pic.png',
      location: 'Former Big Wave Surfer'
    }
  ]
  </script>