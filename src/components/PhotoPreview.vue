<script setup lang="ts">
import ModalLayout from './ModalLayout.vue'
import IconClose from './icons/IconClose.vue'
import { useBlogStore } from '../stores/BlogStore'

const blogStore = useBlogStore()
</script>

<template>
  <ModalLayout>
    <IconClose @click="$emit('close-modal')" class="icon" />
    <img :src="blogStore.blog.blogPhotoFileURL" alt="photo" />
  </ModalLayout>
</template>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: auto;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 15px;
  right: 15px;
  color: #303030;
}

img {
  margin-top: 16px;
  display: block;
  width: auto;
  height: 100%;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
