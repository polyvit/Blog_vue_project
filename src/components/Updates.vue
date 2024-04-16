<script setup lang="ts">
import IconArrowRight from '../components/icons/IconArrorRight.vue'
</script>

<template>
  <div class="updates">
    <div class="container">
      <h2>Register to catch each post</h2>
      <RouterLink to="#" class="router-button"
        >Register<IconArrowRight class="arrow arrow-light"
      /></RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 100px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
