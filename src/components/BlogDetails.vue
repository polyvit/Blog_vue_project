<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  date: number
  initials: string
  firstName: string
  lastName: string
}>()
</script>

<template>
  <div class="details">
    <div>
      <span>{{ initials ?? 'AA' }}</span>
    </div>
    <div>
      <span>{{ firstName ?? 'Author' }} {{ lastName ?? 'Author' }}</span>
      <span>{{ new Date(date).toLocaleString('en-US', { dateStyle: 'long' }) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details {
  display: flex;
  cursor: pointer;
  gap: 11px;
  > div:first-child {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color: $dark-color;
    span {
      pointer-events: none;
    }
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    > span:first-child {
      font-size: 16px;
      font-weight: 500;
    }
    > span:last-child {
      font-size: 13px;
    }
  }
}
</style>
