<script setup lang="ts">
import { getImageUrl } from '../utils'
import Button from '../kit/Button.vue'
import { useUserStore } from '../stores/UserStore'
import { computed } from 'vue'

const authUser = computed(() => useUserStore().user)
</script>

<template>
  <div class="container">
    <div class="left">
      <h1>Your blog<br />Your story</h1>
      <p>
        It is a platform where we gather to share dishonest stories about our lives. Feel free to
        become a part of our community. You're always welcome. Here we publish stories that are hard
        to keep silence about.
      </p>
      <Button v-if="!authUser" color="red">
        <RouterLink class="btn_link" :to="{ name: 'login' }">Become a member</RouterLink>
      </Button>
    </div>
    <div class="right">
      <img
        v-for="(el, index) in [1, 2, 3, 4]"
        :class="[`img_${el}`]"
        :key="index"
        :src="getImageUrl(`photo${el}`, 'blogPhotos')"
        alt="photo"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$banner-color: #31323c;
$white-color: white;

.container {
  background-color: $banner-color;
  padding: 20px 100px;
  display: flex;
  min-height: 540px;
  @media (max-width: 950px) {
    padding: 20px;
  }

  > div {
    width: 50%;
  }

  .left {
    color: white;
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    @media (max-width: 630px) {
      width: 100%;
    }
    h1 {
      font-weight: bold;
      font-size: 60px;
    }
    p {
      max-width: 600px;
    }
    .btn_link {
      color: $white-color;
      text-decoration: none;
      &:visited {
        color: $white-color;
      }
    }
  }
  .right {
    position: relative;
    @media (max-width: 630px) {
      display: none;
    }

    img {
      position: absolute;
    }
    .img_1 {
      top: 22px;
      left: 0;
    }
    .img_2 {
      top: 209px;
      left: 109px;
      z-index: 2;
    }
    .img_3 {
      top: 0;
      left: 201px;
      z-index: 4;
      @media (max-width: 768px) {
        display: none;
      }
    }
    .img_4 {
      top: 78px;
      left: 323px;
      @media (max-width: 1049px) {
        display: none;
      }
    }
  }
}
</style>
