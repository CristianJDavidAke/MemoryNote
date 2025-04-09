<template>
  <h2>Counter {{ count }}</h2>
  <h3>Double {{ doubleCount }}</h3>
  <br />
  <button @click="increment">++</button>
</template>

<script setup lang="ts">
import { useCounterStore } from './piniaFunction'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore) // Reactividad
const { increment } = counterStore // Acción
</script>
