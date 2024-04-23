<script setup lang="ts">
import { defineProps } from 'vue'
import ModalLayout from './ModalLayout.vue'

defineProps<{
  modalMessage: string
}>()
</script>

<template>
  <ModalLayout>
    <p>{{ modalMessage }}</p>
    <button @click="$emit('close-modal')">Close</button>
  </ModalLayout>
</template>

<style lang="scss" scoped>
p {
  text-align: center;
}

button {
  align-self: center;
}
</style>
