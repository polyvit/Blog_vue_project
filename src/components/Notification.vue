<script setup lang="ts">
import ModalLayout from './ModalLayout.vue'
import Button from '../kit/Button.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['clickBtn'])

const clickHandle = () => {
  emit('clickBtn')
}
</script>

<template>
  <ModalLayout>
    <div class="wrapper">
      <p>Are you sure?</p>
      <Button @click="clickHandle">Yes</Button>
    </div>
  </ModalLayout>
</template>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  p {
    margin-bottom: 10px;
  }
}
</style>
