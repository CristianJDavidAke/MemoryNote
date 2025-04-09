<script setup lang="ts">
import TopMenu from '@/modules/common/components/topMenu.vue'
import asideMenu from '../components/asideMenu.vue'
// import counterPi from '../components/counterPi.vue'
</script>

<template>
  <div class="flex flex-col">
    <TopMenu></TopMenu>

    <main class="flex flex-row">
      <asideMenu></asideMenu>

      <router-view></router-view>
      <!-- <counterPi></counterPi> -->
    </main>
  </div>
</template>
