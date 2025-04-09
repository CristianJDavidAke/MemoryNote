<template>
  <dialog class="modal" :open="open ?? false">
    <div class="modal-box">
      <div>
        <h1>Header</h1>
        <slot name="header"></slot>
      </div>

      <div>
        <h3>Body</h3>
        <slot name="body"></slot>
      </div>

      <div>
        <h5>Footer</h5>
        <slot name="footer"></slot>
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-40 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
interface Props {
  open?: boolean
}

defineProps<Props>()
</script>
